import { Card } from "./card";
import { SpecialCard } from "./special_card";

export class TechnicalShot extends Card {
  public first_position: string;
  public second_position: string;
  public first_target: string;
  public second_target: string;
  public first_shot: string;
  public second_shot: string;
  public current_shot?: string;

  public constructor(
    id: number,
    type: string,
    first_position: string,
    second_position: string,
    first_target: string,
    second_target: string,
    first_shot: string,
    second_shot: string
  ) {
    super(id, type); // Call the base class constructor with requisecond arguments
    this.first_position = first_position;
    this.second_position = second_position;
    this.first_target = first_target;
    this.second_target = second_target;
    this.first_shot = first_shot;
    this.second_shot = second_shot;
  }

  public canSmash(previousCard: Card): boolean {
    if (previousCard instanceof SpecialCard)
      return false; // Cannot smash a special card
    else if (previousCard instanceof TechnicalShot) {
      // Verifier que le coup précédent est valable pour le smash
      const validShots = ["long_serv", "clear", "lift", "defense"];
      return validShots.includes(previousCard.getCurrentShot());
    } else return false; // Cannot smash a non-technical card
  }

  public getfirstPosition(): string {
    return this.first_position;
  }

  public getsecondPosition(): string {
    return this.second_position;
  }

  public getfirstTarget(): string {
    return this.first_target;
  }

  public getsecondTarget(): string {
    return this.second_target;
  }

  public getfirstShot(): string {
    return this.first_shot;
  }

  public getsecondShot(): string {
    return this.second_shot;
  }

  public getCurrentShot(): string {
    return this.current_shot ?? "";
  }

  public setCurrentShot(current_shot: string): void {
    this.current_shot = current_shot;
  }

  public setfirstPosition(first_position: string): void {
    this.first_position = first_position;
  }

  public setsecondPosition(second_position: string): void {
    this.second_position = second_position;
  }

  public setfirstTarget(first_target: string): void {
    this.first_target = first_target;
  }

  public setsecondTarget(second_target: string): void {
    this.second_target = second_target;
  }

  public setfirstShot(first_shot: string): void {
    this.first_shot = first_shot;
  }

  public setsecondShot(second_shot: string): void {
    this.second_shot = second_shot;
  }

  public setWinningShot(current_shot: string): void {
    this.current_shot = current_shot;
  }

  toJSON() {
    return {
      id: this.id,
      type: this.type,
      class: "TechnicalShot",
      first_position: this.first_position,
      second_position: this.second_position,
      first_target: this.first_target,
      second_target: this.second_target,
      first_shot: this.first_shot,
      second_shot: this.second_shot,
      current_shot: this.current_shot,
    };
  }
}
