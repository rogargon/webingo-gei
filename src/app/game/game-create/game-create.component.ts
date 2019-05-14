import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {GameService} from "../game.service";
import {Game} from "../game";

@Component({
  selector: 'app-game-create',
  templateUrl: 'game-create.component.html',
  providers: [GameService]
})


export class GameCreateComponent implements OnInit {

  public game: Game;
  public games: Game[] = [];

  constructor(private router: Router,
              private gameService: GameService) {
  }

  ngOnInit() {
    this.game = new Game();
  }

  onSubmit(): void {
    this.gameService.create(this.game).subscribe(
      (game: Game) => this.router.navigate(['/games']));
  }
}
