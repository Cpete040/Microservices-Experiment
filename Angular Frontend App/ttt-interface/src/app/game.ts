export class Game {
    public id: string;
    public state: string[];
    public winner: string;

    constructor(data?: any){
        data ??= {};
        this.id = data.id ?? null;
        this.state = data.state ?? ["", "", "", "", "", "", "", "", ""];
        this.winner = data.winner ?? null;
    }
}
