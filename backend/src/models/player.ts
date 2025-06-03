import { Hand } from "./hand";
import { Deck } from "./deck";
import { SpecialCard } from "./special_card";

export class Player {
  private id: number;
  private name: string;
  private score: number;
  private hand: Hand;
  private histurn: boolean;
  private team: number;

  public constructor(
    id: number,
    name: string,
    score: number,
    hand: Hand,
    histurn: boolean,
    team: number
  ) {
    this.id = id;
    this.name = name;
    this.score = score;
    this.hand = hand;
    this.histurn = histurn;
    this.team = 0;
  }

 public hasWinPointInHand(): boolean {
  for (const element of this.hand.cards) {
    if (element instanceof SpecialCard) {
      if (element.getDescription() === "winPoint") {
        console.log(element.getDescription());
        return true;
      }
    }
  }
  return false;
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

  public getCards(): any[] {
    return this.hand.getCards();
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

  public receiveCard(card: any): void {
    this.hand.addCard(card);
  }

  public setTeam(team: number): void {
    this.team = team;
  }

  public getTeam(): number {
    return this.team;
  }
}
