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
  public target?: string;

  public constructor(
    id: number,
    type: string,
    isPlayable: boolean,
    first_position: string,
    second_position: string,
    first_target: string,
    second_target: string,
    first_shot: string,
    second_shot: string
  ) {
    super(id, type, isPlayable); // Call the base class constructor with requisecond arguments
    this.first_position = first_position;
    this.second_position = second_position;
    this.first_target = first_target;
    this.second_target = second_target;
    this.first_shot = first_shot;
    this.second_shot = second_shot;
  }

  public canPlayOnTechnical(card: TechnicalShot): boolean {
    let shotsWeCanPlay: string[] = [];
      if (card.current_shot === "short_serv") {
      shotsWeCanPlay = ["drive", "block", "lift", "attack"];
      if((this.first_position === card.target && shotsWeCanPlay.includes(this.first_shot)) || 
      (this.second_position === card.target) && shotsWeCanPlay.includes(this.second_shot)) {
        return true;
      }
    } else if (card.current_shot === "long_serv") {
      shotsWeCanPlay = ["clear", "drop", "slice", "smash"];
      if((this.first_position === card.target && shotsWeCanPlay.includes(this.first_shot)) || 
      (this.second_position === card.target) && shotsWeCanPlay.includes(this.second_shot)) {
        return true;
      }
    }
      else if (card.current_shot === "drop") {
        shotsWeCanPlay = ["drop", "lift", "rush", "drive"];
        if((this.first_position === card.target && shotsWeCanPlay.includes(this.first_shot)) || 
        (this.second_position === card.target) && shotsWeCanPlay.includes(this.second_shot)) {
          return true;
        }
    }
      else if (card.current_shot === "lift") {
        shotsWeCanPlay = ["clear", "drop", "slice", "smash"];
        if((this.first_position === card.target && shotsWeCanPlay.includes(this.first_shot)) || 
        (this.second_position === card.target) && shotsWeCanPlay.includes(this.second_shot)) {
          return true;
        }
    }
      else if (card.current_shot === "drive") {
        shotsWeCanPlay = ["drive", "block", "lift", "attack", "defense", "drop"];
        if((this.first_position === card.target && shotsWeCanPlay.includes(this.first_shot)) || 
        (this.second_position === card.target) && shotsWeCanPlay.includes(this.second_shot)) {
          return true;
        }
    }
      else if (card.current_shot === "block") {
        shotsWeCanPlay = ["drop", "lift", "rush"];
        if((this.first_position === card.target && shotsWeCanPlay.includes(this.first_shot)) ||
        (this.second_position === card.target) && shotsWeCanPlay.includes(this.second_shot)) {
          return true;
        }
    }
      else if (card.current_shot === "clear") {
        shotsWeCanPlay = ["clear", "slice", "smash", "drop"];
        if((this.first_position === card.target && shotsWeCanPlay.includes(this.first_shot)) || 
        (this.second_position === card.target) && shotsWeCanPlay.includes(this.second_shot)) {
          return true;
      }
    }
      else if (card.current_shot === "slice") {
        shotsWeCanPlay = ["drop", "lift", "drive"];
        if((this.first_position === card.target && shotsWeCanPlay.includes(this.first_shot)) ||
        (this.second_position === card.target) && shotsWeCanPlay.includes(this.second_shot)) {
          return true;
        }
    }
      else if (card.current_shot === "smash") {
        shotsWeCanPlay = ["defense", "block", "lift"];
        if((this.first_position === card.target && shotsWeCanPlay.includes(this.first_shot)) ||
        (this.second_position === card.target) && shotsWeCanPlay.includes(this.second_shot)) {
          return true;
        }
    }
      else if (card.current_shot === "rush" || card.current_shot === "attack") {
        shotsWeCanPlay = ["block", "lift", "defense", "drive"];
        if((this.first_position === card.target && shotsWeCanPlay.includes(this.first_shot)) ||
        (this.second_position === card.target) && shotsWeCanPlay.includes(this.second_shot)) {
          return true;
        }
    }
      else if (card.current_shot === "defense") {
        shotsWeCanPlay = ["clear", "drop", "slice", "smash"];
        if((this.first_position === card.target && shotsWeCanPlay.includes(this.first_shot)) ||
        (this.second_position === card.target) && shotsWeCanPlay.includes(this.second_shot)) {
          return true;
        }
    } 
      return false; // Si aucune condition n'est remplie, on ne peut pas jouer la carte
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
      isPlayable: this.isPlayable,
      class: "TechnicalShot",
      first_position: this.first_position,
      second_position: this.second_position,
      first_target: this.first_target,
      second_target: this.second_target,
      first_shot: this.first_shot,
      second_shot: this.second_shot,
      current_shot: this.current_shot,
      target: this.target,
    };
  }
}
