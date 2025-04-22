import { Card } from "./card";
import { TechnicalShot } from "./technical_shot";

export class SpecialCard extends Card {
  public description: string;

  public constructor(id: number, type: string, isPlayable: boolean, description: string) {
    super(id, type, isPlayable); // Call the base class constructor
    this.description = description;
  }

  public isCardPlayable(card: Card): boolean {
    if (card instanceof SpecialCard) {
      if (this.getDescription() === "winPoint") {
        // si la carte au dessus est une winPoint
        return card.getDescription() === "calledOut";
      } else {
        return false;
      }
    } else if (card instanceof TechnicalShot) {
      if (this.getDescription() === "serveOut") {
        return card.getType() === "serve";
      } else if (this.getDescription() === "calledOut") {
        return card.getType() === "technical";
      } else if (this.getDescription() === "winningSmash") {
        return (
          card.current_shot === "clear" ||
          card.current_shot === "lift" ||
          card.current_shot === "defense" ||
          card.current_shot === "long_serv"
        );
      } else if (this.getDescription() === "joker") {
        return card.getType() === "technical";
      } else if (this.getDescription() === "winPoint") {
        return false;
      }
    }
    return false;
  }

  public getDescription(): string {
    return this.description;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public effectActivated(): void {
    console.log("Effect activated");
  }

  toJSON() {
    return {
      id: this.id,
      type: this.type,
      isPlayable: this.isPlayable,
      description: this.description,
      class: "SpecialCard",
    };
  }
}
