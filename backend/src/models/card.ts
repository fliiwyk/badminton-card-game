export class Card {
  public id: number;
  public type: string;
  public isPlayable: boolean = false; // Indique si la carte est jouable ou non

  public constructor(id: number, type: string, isPlayable: boolean = false) {
    this.id = id;
    this.type = type;
    this.isPlayable = isPlayable; // Initialiser la propriété isPlayable

  }


  public getId(): number {
    return this.id; 
  }

  public getType(): string {
    return this.type;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public setType(type: string): void {
    this.type = type;
  }


  public toJSON() {
    return {
      id: this.id,
      type: this.type,
      isPlayable: this.isPlayable,
      class: "Card",
    };
  }
}
