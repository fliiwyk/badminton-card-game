import { Card } from "./card";

export class TechnicalShot extends Card{
    
    public blue_position : string;
    public red_position : string;
    public blue_target : string;
    public red_target : string;
    public blue_shot : string;
    public red_shot : string;
    public winning_shot : boolean;

    public constructor (id: number, type: string, description: string, blue_position: string, red_position: string, blue_target: string, red_target: string, blue_shot: string, red_shot: string, winning_shot: boolean ){
            super(id, type, description); // Call the base class constructor with required arguments
            this.blue_position = blue_position;
            this.red_position = red_position;
            this.blue_target = blue_target;
            this.red_target = red_target;
            this.blue_shot = blue_shot;
            this.red_shot = red_shot;
            this.winning_shot = winning_shot;
    }



        





}