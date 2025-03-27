import { Card } from "./card";  
import { TechnicalShot } from "./technical_shot";
import { SpecialCard } from "./special_card";

//une main peut contenir de 7 à 10 cartes
export class Hand {
    public cards: Card[] = [];

    public constructor() {
        this.cards = [];
    }

    public getCards(): Card[] {
        return this.cards;
    }

    public setCards(cards: Card[]): void {
        this.cards = cards;
    }

    public addCard(card: Card): void {
        this.cards.push(card);
    }

    public removeCard(card: Card): void {
        this.cards = this.cards.filter(c => c !== card);
    }

    public getTechnicalShotCards(): TechnicalShot[] {
        return this.cards.filter(c => c instanceof TechnicalShot) as TechnicalShot[];
    }

    public getSpecialCards(): SpecialCard[] {
        return this.cards.filter(c => c instanceof SpecialCard) as SpecialCard[];
    }
}