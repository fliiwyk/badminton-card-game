import { Card } from "./card";

export class SpecialCard extends Card{
    
    public description : string;

    public constructor (id: number, type: string, description: string){
            super(id, type); // Call the base class constructor
            this.description = description;
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
}


