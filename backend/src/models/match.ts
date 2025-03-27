import { Player } from "./player";
import { Card } from "./card";
import { TechnicalShot } from "./technical_shot";
import { Deck } from "./deck";
import { SpecialCard } from "./special_card";
import { Hand } from "./hand";
import { allCards } from "../data/datas";



export class Match {

    public id: number;
    public type : string;
    public players: Player[];
    public currentPlayer!: Player;

    public winner!: Player;
    public turn: number;
    public end: boolean;

    public constructor(id: number, type: string, players: Player[], turn: number, end: boolean) {
        this.id = id;
        this.type = type;
        this.players = players;
        this.turn = turn;
        this.end = end;
    }

    public setupMatch(allCards: Card[]): void {
        let allCardsDeck = new Deck();
        allCardsDeck.setCards(allCards);

        //afficher le nombre de cartes dans allcards    
        console.log("Nombre de cartes dans le deck : " + allCardsDeck.getCards().length);

    
        let serveDeck: Deck = this.setupServeDeck(allCardsDeck);
        let setupDeck: Deck = allCardsDeck;

        //afficher le nombre de cartes  
        console.log("Nombre de cartes dans le deck de service : " + serveDeck.getCards().length);
        console.log("Nombre de cartes restantes dans le deck : " + setupDeck.getCards().length);

        // Mélanger le deck de cartes
        serveDeck.shuffle();
        setupDeck.shuffle();

        // Distribuer les cartes aux joueurs
        this.drawCards(setupDeck);

        console.log("Nombre de cartes restantes dans le deck : " + setupDeck.getCards().length);



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
        this.players = this.players.filter(p => p !== player);
    }

    public endMatch(): void {
        this.end = true;
    }

    public nextTurn(): void {
        this.turn++;
    }
}