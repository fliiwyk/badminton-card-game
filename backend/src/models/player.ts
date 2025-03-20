import { Hand } from "./hand";


export class Player { 

    private id: number;
    private name: string;
    private score: number;
    private hand: Hand;
    private histurn: boolean;

    public constructor(id: number, name: string, score: number, hand: Hand, histurn: boolean) {
        this.id = id;
        this.name = name;
        this.score = score;
        this.hand = hand;
        this.histurn = histurn;
    }

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getScore(): number {
        return this.score;
    }

    public getHand(): Hand {
        return this.hand;
    }

    public getHisturn(): boolean {
        return this.histurn;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setScore(score: number): void {
        this.score = score;
    }

    public setHand(hand: Hand): void {
        this.hand = hand;
    }

    public setHisturn(histurn: boolean): void {
        this.histurn = histurn;
    }

    public addScore(score: number): void {
        this.score += score;
    }

    


}