import express from "express";
import { allCards } from "../data/datas";
import { Match } from "../models/match";
import { Player } from "../models/player";
import { Hand } from "../models/hand";


const router = express.Router();

router.get("/start-match", (req, res) => {
  const Alice = new Player(1, "Alice", 0, new Hand(), true, 1);
  const Bob = new Player(2, "Bob", 0, new Hand(), false, 2);
  const match = new Match(1, "single", [Alice, Bob], 0, false);
  match.setupMatch(allCards);
  match.playServeCard();

  const playersData = match.players.map((player) => ({
    id: player.getId(),
    name: player.getName(),
    hand: player.getHand().getCards().map((card) => {
      match.isPlayableCard(card);
      const cardJSON = card.toJSON();
      return {
        ...cardJSON,
      };
    }),
  }));
  

  // Récupérer uniquement la première carte du deck du milieu
  const middleDeckTopCard = match.middleDeck?.cards[0]?.toJSON() || null;

  // Réponse incluant joueurs et première carte du deck du milieu
  res.json({
    players: playersData,
    middleDeckTopCard,
  });
});

export default router;
