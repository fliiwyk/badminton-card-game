import { Card } from "./card";  
import { TechnicalShot } from "./technical_shot";
import { SpecialCard } from "./special_card";

export class Deck {
    public cards: Card[];
    
    public constructor() {
        this.cards = [];
    }

    public getCards(): Card[] {
        return this.cards;
    }

    public setCards(cards: Card[]): void {
        this.cards = cards;
    }

    // Retourne une carte du deck
    public drawCard(): Card {
        const card = this.cards.pop();
        if (!card) {
            throw new Error("Cannot draw a card from an empty deck.");
        }
        return card;
    }

    //Distribue 4 cartes
    public distributeCardsDouble(): Card[] {
        const drawnCards: Card[] = [];
        for (let i = 0; i < 4; i++) {
            const card = this.drawCard();
            drawnCards.push(card);
        }
        return drawnCards;
    }

    //Distribue 7 cartes
    public distributeCardsSingle(): Card[] {
        const drawnCards: Card[] = [];
        for (let i = 0; i < 7; i++) {
            const card = this.drawCard();
            drawnCards.push(card);
        }
        return drawnCards;
    }

    // Mélange les cartes du deck
    public shuffle(): void {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    
    

    

    
}