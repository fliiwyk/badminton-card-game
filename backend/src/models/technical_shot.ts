import { Card } from "./card";

export class TechnicalShot extends Card{
    
    public blue_position : string;
    public red_position : string;
    public blue_target : string;
    public red_target : string;
    public blue_shot : string;
    public red_shot : string;
    public winning_shot : boolean;

    public constructor (id: number, type: string, blue_position: string, red_position: string, blue_target: string, red_target: string, blue_shot: string, red_shot: string, winning_shot: boolean ){
            super(id, type); // Call the base class constructor with required arguments
            this.blue_position = blue_position;
            this.red_position = red_position;
            this.blue_target = blue_target;
            this.red_target = red_target;
            this.blue_shot = blue_shot;
            this.red_shot = red_shot;
            this.winning_shot = winning_shot;
    }


    public getBluePosition(): string {
        return this.blue_position;
    }

    public getRedPosition(): string {
        return this.red_position;
    }

    public getBlueTarget(): string {
        return this.blue_target;
    }

    public getRedTarget(): string {
        return this.red_target;
    }

    public getBlueShot(): string {
        return this.blue_shot;
    }

    public getRedShot(): string {
        return this.red_shot;
    }

    public getWinningShot(): boolean {
        return this.winning_shot;
    }

    public setBluePosition(blue_position: string): void {
        this.blue_position = blue_position;
    }

    public setRedPosition(red_position: string): void {
        this.red_position = red_position;
    }

    public setBlueTarget(blue_target: string): void {
        this.blue_target = blue_target;
    }

    public setRedTarget(red_target: string): void {
        this.red_target = red_target;
    }

    public setBlueShot(blue_shot: string): void {
        this.blue_shot = blue_shot;
    }

    public setRedShot(red_shot: string): void {
        this.red_shot = red_shot;
    }

    public setWinningShot(winning_shot: boolean): void {
        this.winning_shot = winning_shot;
    }

    


        





}