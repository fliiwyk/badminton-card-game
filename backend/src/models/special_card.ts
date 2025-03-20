import { Card } from "./card";

export class SpecialCard extends Card{
    
    public description : string;
    public effect : string;

    public constructor (id: number, type: string, description: string, effect: string, effect_value: number){
            super(id, type); // Call the base class constructor
            this.description = description;
            this.effect = effect;
    }

    public getEffect(): string {
        return this.effect;
    }

    public getDescription(): string {
        return this.description;
    }

    public setEffect(effect: string): void {
        this.effect = effect;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    public effectActivated(): void {
        console.log("Effect activated");
    }
}


