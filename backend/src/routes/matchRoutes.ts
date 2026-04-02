import express from "express";
import { allCards } from "../data/datas";
import { Match } from "../models/match";
import { Player } from "../models/player";
import { Hand } from "../models/hand";
import { Card } from "../models/card";
import { TechnicalShot } from "../models/technical_shot";
import { SpecialCard } from "../models/special_card";

const router = express.Router();

// In-memory match store
const matches = new Map<number, Match>();
let nextMatchId = 1;

function serializeCard(card: Card, topCard?: Card) {
  if (topCard) {
    card.isPlayableCard(topCard);
  }
  return card.toJSON();
}

function getMatchState(match: Match, forPlayerId?: number) {
  const topCard = match.middleDeck?.cards[0] ?? undefined;

  const players = match.players.map((player) => ({
    id: player.getId(),
    name: player.getName(),
    score: player.getScore(),
    handCount: player.getHand().getCards().length,
    hand: player.getHand().getCards().map((card) => serializeCard(card, topCard)),
  }));

  return {
    matchId: match.getId(),
    currentPlayerId: match.getCurrentPlayer().getId(),
    players,
    middleDeckTopCard: topCard ? topCard.toJSON() : null,
    phase: match.phase,
    drawsRemaining: match.drawsRemaining,
    message: match.message,
    scores: match.players.map((p) => ({ id: p.getId(), name: p.getName(), score: p.getScore() })),
    winner: match.getEnd() ? match.getWinner()?.getName() ?? null : null,
    canDraw: match.phase === "play" && !hasPlayableCards(match),
    mainDeckCount: match.mainDeck?.cards.length ?? 0,
    serveDeckCount: match.serveDeck?.cards.length ?? 0,
  };
}

function hasPlayableCards(match: Match): boolean {
  const topCard = match.middleDeck?.cards[0];
  if (!topCard) return false;
  const cards = match.getCurrentPlayer().getHand().getCards();
  return cards.some((card) => {
    card.isPlayableCard(topCard);
    return card.isPlayable;
  });
}

// Start a new match
router.post("/match/start", (req, res) => {
  const { player1Name, player2Name, maxScore } = req.body;
  const p1 = new Player(1, player1Name || "Joueur 1", 0, new Hand(), true, 1);
  const p2 = new Player(2, player2Name || "Joueur 2", 0, new Hand(), false, 2);

  const matchId = nextMatchId++;
  const match = new Match(matchId, "single", [p1, p2], 0, false);

  // Deep copy the cards so each match gets its own set
  const cardsCopy = allCards.map((card) => {
    if (card instanceof TechnicalShot) {
      return new TechnicalShot(
        card.id, card.type, false,
        card.first_position, card.second_position,
        card.first_target, card.second_target,
        card.first_shot, card.second_shot
      );
    } else if (card instanceof SpecialCard) {
      return new SpecialCard(card.id, card.type, false, card.description);
    }
    return new Card(card.id, card.type, false);
  });

  match.setupMatch(cardsCopy);
  match.playServeCard();
  match.phase = "play";
  match.message = "L'echange commence !";
  // After serve, it's player 2's turn (receiver)
  match.setCurrentPlayer(match.players[1]);

  matches.set(matchId, match);
  res.json(getMatchState(match));
});

// Get match state
router.get("/match/:id", (req, res): void => {
  const match = matches.get(parseInt(req.params.id));
  if (!match) { res.status(404).json({ error: "Match not found" }); return; }
  res.json(getMatchState(match));
});

// Play a card
router.post("/match/:id/play-card", (req, res): void => {
  const match = matches.get(parseInt(req.params.id));
  if (!match) { res.status(404).json({ error: "Match not found" }); return; }

  const { cardId, side } = req.body; // side: "first" or "second"

  if (match.getEnd()) {
    res.status(400).json({ error: "Match is over" }); return;
  }

  const currentPlayer = match.getCurrentPlayer();
  const card = currentPlayer.getHand().getCards().find((c) => c.getId() === cardId);

  if (!card) {
    res.status(400).json({ error: "Card not in hand" }); return;
  }

  const topCard = match.middleDeck?.cards[0];
  card.isPlayableCard(topCard);

  if (!card.isPlayable) {
    res.status(400).json({ error: "Card is not playable" }); return;
  }

  // Set the current_shot and target based on side choice
  if (card instanceof TechnicalShot) {
    if (side === "first") {
      card.setCurrentShot(card.first_shot);
      card.target = card.first_target;
    } else {
      card.setCurrentShot(card.second_shot);
      card.target = card.second_target;
    }
  }

  // Play the card
  currentPlayer.playCard(card, match.middleDeck!);
  match.drawsRemaining = 3;

  // Handle special card effects
  if (card instanceof SpecialCard) {
    const desc = card.getDescription();

    if (desc === "winPoint" || desc === "winningSmash" || desc === "serveOut") {
      // Current player wins the point
      currentPlayer.addScore(1);
      match.message = `${currentPlayer.getName()} marque le point ! (${desc})`;
      match.resolvePoint(currentPlayer);
      res.json(getMatchState(match)); return;
    }

    if (desc === "calledOut") {
      // If played on a winPoint, the player who played calledOut wins
      if (topCard instanceof SpecialCard && topCard.getDescription() === "winPoint") {
        currentPlayer.addScore(1);
        match.message = `${currentPlayer.getName()} conteste et gagne le point ! (Challenge Out)`;
        match.resolvePoint(currentPlayer);
        res.json(getMatchState(match)); return;
      }
    }

    if (desc === "joker") {
      match.message = `${currentPlayer.getName()} joue le Joker !`;
    }
  } else {
    match.message = `${currentPlayer.getName()} joue un ${(card as TechnicalShot).getCurrentShot()} !`;
  }

  // Refill hand if needed
  match.refillHand(currentPlayer);

  // Switch turn
  match.switchTurn();

  res.json(getMatchState(match));
});

// Draw cards (when can't play)
router.post("/match/:id/draw", (req, res): void => {
  const match = matches.get(parseInt(req.params.id));
  if (!match) { res.status(404).json({ error: "Match not found" }); return; }

  if (match.getEnd()) {
    res.status(400).json({ error: "Match is over" }); return;
  }

  if (match.drawsRemaining <= 0) {
    res.status(400).json({ error: "No draws remaining" }); return;
  }

  const currentPlayer = match.getCurrentPlayer();

  // Check if player actually has no playable cards
  if (hasPlayableCards(match)) {
    res.status(400).json({ error: "You have playable cards" }); return;
  }

  // Draw a card
  if (match.mainDeck && match.mainDeck.cards.length > 0) {
    const drawn = match.mainDeck.drawCard();
    currentPlayer.receiveCard(drawn);
    match.drawsRemaining--;

    // Check if now has playable cards
    if (hasPlayableCards(match)) {
      match.message = `${currentPlayer.getName()} pioche et peut maintenant jouer !`;
    } else if (match.drawsRemaining <= 0) {
      // Can't play after 3 draws - opponent scores
      const opponent = match.getOpponent();
      opponent.addScore(1);
      match.message = `${currentPlayer.getName()} ne peut pas jouer apres 3 pioches. ${opponent.getName()} marque le point !`;
      match.resolvePoint(opponent);
    } else {
      match.message = `${currentPlayer.getName()} pioche... (${match.drawsRemaining} pioche(s) restante(s))`;
    }
  } else {
    // No cards left to draw, opponent scores
    const opponent = match.getOpponent();
    opponent.addScore(1);
    match.message = `Plus de cartes dans la pioche ! ${opponent.getName()} marque le point.`;
    match.resolvePoint(opponent);
  }

  res.json(getMatchState(match));
});

export default router;
