import { Component } from '@angular/core';
import { Game } from './game';
import { TttRequestServiceService } from './ttt-request-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public game: Game;
  public games: Game[] = [];
  public winnerMessage = "";

  constructor(private readonly reqService: TttRequestServiceService){
    this.updateGames();
    this.game = new Game(); 
  }

  public selectCell(index: number){
    //add condition
    if(!this.game.state[index]){
      this.game.state[index] = "X";
      this.reqService.getMove<Game>(this.game).subscribe({
        next: (response: any) => {
          this.game = new Game(response);
          if(this.game.winner){
            if(this.game.winner === "X"){
              this.winnerMessage = "You Win!";
            } else if(this.game.winner === "X") {
              this.winnerMessage = "Computer Wins :(";
            } else {
              this.winnerMessage = "Tie!";
            }
            this.reqService.postGame(this.game).subscribe({
              next: (response: any) => {
                this.updateGames();
              }
            });
          }
        }
      })
    }
  }

  public restart(){
    this.game = new Game();
    this.winnerMessage = "";
  }

  public updateGames(){
    this.games = [];
    this.reqService.getAllGames().subscribe({
      next: (response: any) => {
        for(let value of response){
          this.games.push(new Game(value));
        }
      }
    });
  }
}
