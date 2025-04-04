import { Card } from "./card";
import { TechnicalShot } from "./technical_shot";

export class SpecialCard extends Card {
  public description: string;

  public constructor(id: number, type: string, description: string) {
    super(id, type); // Call the base class constructor
    this.description = description;
  }

  public isPlayable(card: Card): boolean {
    if (card instanceof SpecialCard) {
          // si la carte au dessus est une special card
          if (card.getDescription() === "winPoint") 
          // si la carte est un calledOut on peut la jouer sinon non
            return this.getDescription() === "calledOut";    
    }   
    else if(card instanceof TechnicalShot) {
          if(this.getDescription() === "serveOut") 
            return card.getType() === "serve";
          else if(this.getDescription() === "calledOut") 
            return card.getType() === "technical";
          else if(this.getDescription() === "winningSmash") 
            return () //TODO vefifier si le coup précédent permet de faire un smash
          else
            return false; //TODO
          
    }
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
      description: this.description,
      class: "SpecialCard",
    };
  }
}
