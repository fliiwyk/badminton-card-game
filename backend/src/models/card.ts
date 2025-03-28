export class Card {
  public id: number;
  public type: string;

  public constructor(id: number, type: string) {
    this.id = id;
    this.type = type;
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
      class: "Card",
    };
  }
}
