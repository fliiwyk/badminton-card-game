import { Player } from "./player";

export class Match {

    public id: number;
    public players: Player[];
    public winner: Player;
    public turn: number;
    public end: boolean;

    public constructor(id: number, players: Player[], winner: Player, turn: number, end: boolean) {
        this.id = id;
        this.players = players;
        this.winner = winner;
        this.turn = turn;
        this.end = end;
    }

    public getId(): number {
        return this.id;
    }

    public getPlayers(): Player[] {
        return this.players;
    }

    public getWinner(): Player {
        return this.winner;
    }

    public getTurn(): number {
        return this.turn;
    }

    public getEnd(): boolean {
        return this.end;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public setPlayers(players: Player[]): void {
        this.players = players;
    }

    public setWinner(winner: Player): void {
        this.winner = winner;
    }

    public setTurn(turn: number): void {
        this.turn = turn;
    }

    public setEnd(end: boolean): void {
        this.end = end;
    }

    public addPlayer(player: Player): void {
        this.players.push(player);
    }

    public removePlayer(player: Player): void {
        this.players = this.players.filter(p => p !== player);
    }

    public endMatch(): void {
        this.end = true;
    }

    public nextTurn(): void {
        this.turn++;
    }
}