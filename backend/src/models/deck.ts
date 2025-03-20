import { Card } from "./card";  
import { TechnicalShot } from "./technical_shot";
import { SpecialCard } from "./special_card";

export class Deck {
    public id: number;
    public cards: Card[];
    
    public constructor(id: number, cards: Card[]) {
        this.id = id;
        this.cards = cards;
    }

    public getId(): number {
        return this.id;
    }

    public getCards(): Card[] {
        return this.cards;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public setCards(cards: Card[]): void {
        this.cards = cards;
    }

    /** Mélange le deck avec l'algorithme de Fisher-Yates */
    private shuffle(): void {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    
    

    

    
}