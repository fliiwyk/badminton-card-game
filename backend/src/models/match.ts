import { Player } from "./player";
import { Card } from "./card";
import { TechnicalShot } from "./technical_shot";
import { Deck } from "./deck";
import { SpecialCard } from "./special_card";
import { Hand } from "./hand";

export class Match {
  public id: number;
  public type: string;
  public players: Player[];
  public currentPlayer!: Player;
  public serveDeck?: Deck;
  public mainDeck?: Deck;
  public middleDeck?: Deck;
  public winner!: Player;
  public turn: number;
  public end: boolean;

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
    let allCardsDeck = new Deck();
    allCardsDeck.setCards(allCards);

    this.serveDeck = this.setupServeDeck(allCardsDeck);
    this.mainDeck = allCardsDeck;
    this.middleDeck = new Deck();

    // Mélanger le deck de cartes
    this.serveDeck.shuffle();
    this.mainDeck.shuffle();

    // Distribuer les cartes aux joueurs
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
    if (this.type === "double") {
      for (let i = 0; i < this.players.length; i++) {
        const hand = new Hand(); // ← nouvelle instance pour CHAQUE joueur
        hand.setCards(deck.distributeCardsDouble());
        this.players[i].setHand(hand);
      }
    } else if (this.type === "single") {
      for (let i = 0; i < this.players.length; i++) {
        const hand = new Hand();
        hand.setCards(deck.distributeCardsSingle());
        this.players[i].setHand(hand);
      }
    } else {
      throw new Error("Invalid match type");
    }
  }

  public setupScores(): void {
    //parcourir la liste des joueurs
    for (const player of this.players) {
      //initialiser le score de chaque joueur à 0
      player.setScore(0);
    }
  }

  public playServeCard(): void {
    const serveCard = this.serveDeck?.drawCard();
    if (serveCard instanceof TechnicalShot) {
      //Si le score est pair
      if(this.currentPlayer.getScore()%2 === 0){
      serveCard.setCurrentShot(serveCard.second_shot);
      serveCard.target = serveCard.second_target;
      this.middleDeck?.cards.unshift(serveCard);
      }
      else if(this.currentPlayer.getScore()%2 === 1){
        serveCard.setCurrentShot(serveCard.first_shot);
        serveCard.target = serveCard.first_target;
        this.middleDeck?.cards.unshift(serveCard);
      }
    } else {
      throw new Error("No serve cards left in the deck.");
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //à modifier avec des fonctions dans card
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  public isPlayableCard(card: Card): void {
    const topCard = this.middleDeck?.cards[0];
  
    if (!topCard) {
      card.isPlayable = true; // Si le deck est vide, toute carte peut être jouée
    } else if (topCard instanceof SpecialCard) {
      const topDescription = topCard.getDescription();
  
      if (topDescription === "winPoint") {
        if (card instanceof SpecialCard) {
          card.isPlayable = card.getDescription() === "calledOut";
        } else {
          card.isPlayable = false;
        }
      } else if (topDescription === "joker") {
        if (card instanceof TechnicalShot) {
          const positions = [
            card.getfirstPosition(),
            card.getsecondPosition()
          ];
          card.isPlayable =
            positions.includes("middleLeft") || positions.includes("middleRight");
        } else {
          card.isPlayable = false;
        }
      } else {
        card.isPlayable = false; // Autres specialCards : rien n'est jouable
      }
  
    } else if (topCard instanceof TechnicalShot) {
      if (card instanceof TechnicalShot) {
        card.isPlayable = card.canPlayOnTechnical(topCard);
      } else if (card instanceof SpecialCard) {
        card.isPlayable = card.isCardPlayable(topCard);
      } else {
        card.isPlayable = false;
      }
    } else {
      card.isPlayable = false;
    }
  }
  

  //Un tour de jeu
  public playTurn(): void {
    //poser une carte service dans le deck du milieu
    while(this.currentPlayer.getHisturn){
      
    }

    
    this.playServeCard();
    
  }

  public getType(): string {
    return this.type;
  }

  public setType(type: string): void {
    this.type = type;
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

  public getWinner(): Player {
    return this.winner;
  }

  public getTurn(): number {
    return this.turn;
  }

  public getEnd(): boolean {
    return this.end;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public setPlayers(players: Player[]): void {
    this.players = players;
  }

  public setWinner(winner: Player): void {
    this.winner = winner;
  }

  public setTurn(turn: number): void {
    this.turn = turn;
  }

  public setEnd(end: boolean): void {
    this.end = end;
  }

  public addPlayer(player: Player): void {
    this.players.push(player);
  }

  public removePlayer(player: Player): void {
    this.players = this.players.filter((p) => p !== player);
  }

  public endMatch(): void {
    this.end = true;
  }

  public nextTurn(): void {
    this.turn++;
  }
}
