import { Player } from "./player";
import { Card } from "./card";
import { TechnicalShot } from "./technical_shot";
import { Deck } from "./deck";
import { Hand } from "./hand";

export class Match {
  public id: number;
  public type: string;
  public players: Player[];
  public currentPlayer!: Player;
  public serveDeck?: Deck;
  public mainDeck?: Deck;
  public middleDeck?: Deck;
  public winner?: Player;
  public turn: number;
  public end: boolean;
  public phase: string = "setup"; // setup, serve, play, ended
  public drawsRemaining: number = 3;
  public message: string = "";
  public maxScore: number = 21;

  public constructor(
    id: number,
    type: string,
    players: Player[],
    turn: number,
    end: boolean
  ) {
    this.id = id;
    this.type = type;
    this.players = players;
    this.turn = turn;
    this.end = end;
  }

  public setupMatch(allCards: Card[]): void {
    const allCardsDeck = new Deck();
    allCardsDeck.setCards(allCards);

    this.serveDeck = this.setupServeDeck(allCardsDeck);
    this.mainDeck = allCardsDeck;
    this.middleDeck = new Deck();

    this.serveDeck.shuffle();
    this.mainDeck.shuffle();

    this.drawCards(this.mainDeck);
    this.setupScores();
    this.currentPlayer = this.players[0];
    this.turn = 1;
    this.end = false;
  }

  public setupServeDeck(deck: Deck): Deck {
    const serveDeck = new Deck();
    const remainingCards: Card[] = [];

    for (const card of deck.cards) {
      if (card.getType() === "serve") {
        serveDeck.cards.push(card);
      } else {
        remainingCards.push(card);
      }
    }

    deck.cards = remainingCards;
    return serveDeck;
  }

  public drawCards(deck: Deck): void {
    const count = this.type === "double" ? 4 : 7;
    for (const player of this.players) {
      const hand = new Hand();
      const cards: Card[] = [];
      for (let i = 0; i < count && deck.cards.length > 0; i++) {
        cards.push(deck.drawCard());
      }
      hand.setCards(cards);
      player.setHand(hand);
    }
  }

  public setupScores(): void {
    for (const player of this.players) {
      player.setScore(0);
    }
  }

  public playServeCard(): void {
    const serveCard = this.serveDeck?.drawCard();
    if (serveCard instanceof TechnicalShot) {
      if (this.currentPlayer.getScore() % 2 === 0) {
        serveCard.setCurrentShot(serveCard.second_shot);
        serveCard.target = serveCard.second_target;
      } else {
        serveCard.setCurrentShot(serveCard.first_shot);
        serveCard.target = serveCard.first_target;
      }
      this.middleDeck?.cards.unshift(serveCard);
    } else {
      throw new Error("No serve cards left in the deck.");
    }
  }

  public getOpponent(): Player {
    return this.players.find((p) => p.getId() !== this.currentPlayer.getId())!;
  }

  public switchTurn(): void {
    this.currentPlayer = this.getOpponent();
    this.turn++;
  }

  public refillHand(player: Player): void {
    const minCards = this.type === "double" ? 4 : 7;
    while (
      player.getHand().getCards().length < minCards &&
      this.mainDeck &&
      this.mainDeck.cards.length > 0
    ) {
      player.receiveCard(this.mainDeck.drawCard());
    }
  }

  public resolvePoint(scorer: Player): void {
    // Return technical/special cards from middleDeck to bottom of mainDeck
    if (this.middleDeck) {
      for (const card of this.middleDeck.cards) {
        if (card instanceof TechnicalShot && card.getType() !== "serve") {
          // Reset card state
          card.setCurrentShot("");
          card.target = undefined;
          card.isPlayable = false;
          this.mainDeck?.cards.push(card);
        }
        // Serve cards go back to serve deck
        if (card instanceof TechnicalShot && card.getType() === "serve") {
          card.setCurrentShot("");
          card.target = undefined;
          card.isPlayable = false;
          this.serveDeck?.cards.push(card);
        }
      }
      this.middleDeck.cards = [];
    }

    // Refill hands
    for (const player of this.players) {
      this.refillHand(player);
    }

    // Check win condition
    if (scorer.getScore() >= this.maxScore) {
      this.end = true;
      this.winner = scorer;
      this.phase = "ended";
      this.message = `${scorer.getName()} remporte le match ${scorer.getScore()} !`;
      return;
    }

    // Reset draws
    this.drawsRemaining = 3;

    // Scorer serves next
    this.currentPlayer = scorer;

    // Play next serve
    if (this.serveDeck && this.serveDeck.cards.length > 0) {
      this.playServeCard();
      this.phase = "play";
      const receiver = this.players.find((p) => p.getId() !== scorer.getId())!;
      this.message += ` ${scorer.getName()} sert.`;
      // After serve, receiver plays
      this.currentPlayer = receiver;
    } else {
      this.end = true;
      this.phase = "ended";
      this.message = "Plus de cartes service ! Match termine.";
    }
  }

  public getCurrentPlayer(): Player {
    return this.currentPlayer;
  }

  public setCurrentPlayer(player: Player): void {
    this.currentPlayer = player;
  }

  public getId(): number {
    return this.id;
  }

  public getPlayers(): Player[] {
    return this.players;
  }

  public getWinner(): Player | undefined {
    return this.winner;
  }

  public getTurn(): number {
    return this.turn;
  }

  public getEnd(): boolean {
    return this.end;
  }

  public setEnd(end: boolean): void {
    this.end = end;
  }

  public endMatch(): void {
    this.end = true;
    this.phase = "ended";
  }
}
