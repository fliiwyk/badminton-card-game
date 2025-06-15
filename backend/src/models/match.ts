import { Player } from "./player";
import { Card } from "./card";
import { TechnicalShot } from "./technical_shot";
import { Deck } from "./deck";
import { SpecialCard } from "./special_card";
import { Hand } from "./hand";
import readline from "readline";
import * as readlineSync from "readline-sync";

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
      if (this.currentPlayer.getScore() % 2 === 0) {
        serveCard.setCurrentShot(serveCard.second_shot);
        serveCard.target = serveCard.second_target;
        this.middleDeck?.cards.unshift(serveCard);
        //changer le joueur actuel
        const other = this.players.find((p) => p !== this.currentPlayer)!;
        this.currentPlayer = other;
      } else if (this.currentPlayer.getScore() % 2 === 1) {
        serveCard.setCurrentShot(serveCard.first_shot);
        serveCard.target = serveCard.first_target;
        this.middleDeck?.cards.unshift(serveCard);
        //changer le joueur actuel
        const other = this.players.find((p) => p !== this.currentPlayer)!;
        this.currentPlayer = other;
      }
    } else {
      throw new Error("No serve cards left in the deck.");
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //à modifier avec des fonctions dans card
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Joue un tour pour le joueur actuel.
   * @returns {Promise<boolean>} - Retourne True si l'echange continue, sinon False.
   */

  public playTurn(): boolean {
    console.log("Voici les cartes que vous pouvez jouer :");

    const playableCards: { index: number; card: Card }[] = [];
    const topCard = this.middleDeck?.cards[0];
    const cards = this.currentPlayer.getHand().getCards();

    // Recherche des cartes jouables
    for (let index = 0; index < cards.length; index++) {
      const card = cards[index];
      card.isPlayableCard(topCard);
      if (card.isPlayable) {
        playableCards.push({ index, card });
        console.log(`Carte ${index + 1}`);
        console.log(card.toJSON());
      }
    }

    // Pas de carte jouable
    if (playableCards.length === 0) {
      console.log("Aucune carte jouable dans votre main.");
      console.log("Vous avez perdu le point et devez piocher une carte.");
      const drawnCard = this.mainDeck?.drawCard();
      if (drawnCard) {
        this.currentPlayer.getHand().addCard(drawnCard);
        console.log("Vous avez pioché une carte :", drawnCard.toJSON());
      } else {
        console.log(
          "Le deck principal est vide, vous ne pouvez pas piocher de carte."
        );
      }
      this.giveAPointToPlayer(
        this.players.find((p) => p !== this.currentPlayer)!
      );
      //VERIFIER ICI PROBLEME AVEC LE CURRENT PLAYER
      this.nextTurn();
      return false;
    }

    // Lecture synchrone du choix
    const answer = readlineSync.question(
      "Entrez le numéro de la carte que vous voulez jouer : "
    );
    const chosenIndex = parseInt(answer, 10) - 1;
    const chosenCard = playableCards.find(
      (pc) => pc.index === chosenIndex
    )?.card;

    if (!chosenCard) {
      console.log("Choix invalide. Le rallye s'arrête.");
      return false;
    }

    // On joue la carte
    console.log("Vous avez choisi :", chosenCard.toJSON());
    this.middleDeck?.cards.unshift(chosenCard);
    this.currentPlayer.getHand().removeCard(chosenCard);
    console.log(`Carte jouée avec succès par ${this.currentPlayer.getName()}.`);

    // Gestion des cartes spéciales
    if (this.currentPlayer.hasWinPointInHand()) {
      console.log("Vous avez une carte spéciale 'winPoint' dans votre main.");
      const playWin = readlineSync.keyInYN(
        "Voulez-vous jouer la carte 'winPoint' ? "
      );
      if (playWin) {
        const winPointCard = this.currentPlayer
          .getHand()
          .getCards()
          .find(
            (c) => c instanceof SpecialCard && c.getDescription() === "winPoint"
          )!;
        this.middleDeck?.cards.unshift(winPointCard);
        this.currentPlayer.getHand().removeCard(winPointCard);
        console.log("Carte 'winPoint' jouée.");
        const other = this.players.find((p) => p !== this.currentPlayer)!;
        if (other.hasCalledOutInHand()) {
          const playOut = readlineSync.keyInYN(
            `${other.getName()} a une carte 'callOut'. Voulez-vous l'utiliser ? `
          );
          if (playOut) {
            const outCard = other
              .getHand()
              .getCards()
              .find(
                (c) =>
                  c instanceof SpecialCard && c.getDescription() === "callOut"
              )!;
            this.middleDeck?.cards.unshift(outCard);
            other.getHand().removeCard(outCard);
            console.log(`Carte 'Out' jouée par ${other.getName()}.`);
            this.giveAPointToPlayer(other);
            return false;
          }
        } else {
          console.log("Aucun 'callOut' chez l'adversaire.");
          this.giveAPointToPlayer(this.currentPlayer);
          return false;
        }
      } else {
        console.log("Vous n'avez pas joué la carte 'winPoint'.");
      }
    }

    this.nextTurn();
    return true;
  }

  //Un tour de jeu

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
    // Passer au joueur suivant
    const currentIndex = this.players.indexOf(this.currentPlayer);
    const nextIndex = (currentIndex + 1) % this.players.length;
    this.currentPlayer = this.players[nextIndex];
    // Incrémenter le tour
    this.turn++;
    console.log(
      `C'est maintenant le tour de ${this.currentPlayer.getName()}. Tour numéro ${
        this.turn
      }.`
    );
    // Vérifier si le match est terminé
  }

  public giveAPointToPlayer(player: Player): void {
    player.setScore(player.getScore() + 1);
    this.currentPlayer = player; // Mettre à jour le joueur actuel
    console.log(
      `${player.getName()} a marqué un point ! Nouveau score : ${player.getScore()}`
    );

    // Parcourir le deck du milieu et vérifier si une carte de service est présente
    if (this.middleDeck && this.middleDeck.cards.length > 0) {
      const topCard = this.middleDeck.cards[0];
      if (topCard instanceof TechnicalShot && topCard.getType() === "serve") {
        // Remettre la carte de service dans le deck de service
        if (this.serveDeck) {
          this.serveDeck.cards.push(topCard);
          this.serveDeck.shuffle(); // Mélanger le deck de service après avoir ajouté la carte
        } else {
          console.log(
            "Aucun deck de service disponible pour remettre la carte."
          );
        }
      } else {
        // Si la carte du dessus n'est pas une carte de service, on ne la remet dans le deck principal
        this.mainDeck?.cards.push(topCard);
      }
    } else {
      console.log("Le deck du milieu est vide, aucune carte à remettre.");
    }
    // Réinitialiser le deck du milieu
    if (this.middleDeck) {
      this.middleDeck.cards = []; // Réinitialiser le deck du milieu
    }
  }
}
