import { Card } from "./card";

export class TechnicalShot extends Card{
    
    public first_position : string;
    public second_position : string;
    public first_target : string;
    public second_target : string;
    public first_shot : string;
    public second_shot : string;
    public winning_shot : boolean;

    public constructor (id: number, type: string, first_position: string, second_position: string, first_target: string, second_target: string, first_shot: string, second_shot: string, winning_shot: boolean ){
            super(id, type); // Call the base class constructor with requisecond arguments
            this.first_position = first_position;
            this.second_position = second_position;
            this.first_target = first_target;
            this.second_target = second_target;
            this.first_shot = first_shot;
            this.second_shot = second_shot;
            this.winning_shot = winning_shot;
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

    public getWinningShot(): boolean {
        return this.winning_shot;
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

    public setWinningShot(winning_shot: boolean): void {
        this.winning_shot = winning_shot;
    }

    


        





}