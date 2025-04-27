import { Player } from "./player";
import { Card } from "./card";
import { TechnicalShot } from "./technical_shot";
import { Deck } from "./deck";
import { SpecialCard } from "./special_card";
import { Hand } from "./hand";
import readline from "readline"; 




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

  

  public async playTurn(): Promise<void> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  
    console.log("Voici les cartes que vous pouvez jouer :");
  
    const playableCards: { index: number; card: Card }[] = [];
    const topCard = this.middleDeck && this.middleDeck.cards[0]; // La carte du dessus du deck du milieu
  
    const cards = this.currentPlayer.getHand().getCards();
  
    for (let index = 0; index < cards.length; index++) {
      const card = cards[index];
      card.isPlayableCard(topCard);
  
      if (card.isPlayable) {
        playableCards.push({ index, card });
  
        console.log(`Carte ${index + 1}`);
        console.log(card.toJSON());
      }
    }
  
    const question = (str: string) => new Promise<string>((resolve) => rl.question(str, resolve));
  
    const answer = await question("Entrez le numéro de la carte que vous voulez jouer : ");
    const chosenIndex = parseInt(answer, 10) - 1;
  
    const chosenCard = playableCards.find(pc => pc.index === chosenIndex)?.card;
  
    if (chosenCard) {
      console.log("Vous avez choisi :");
      console.log(chosenCard.toJSON());
      // Jouer la carte ici
    } else {
      console.log("Choix invalide. Veuillez réessayer.");
    }
  }
  
  
  
  
  

  

  //Un tour de jeu
  public playPoint(): void {
 

    
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
