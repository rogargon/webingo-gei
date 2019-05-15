import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {GameService} from "../game.service";
import {Game} from "../game";
import {GameAdminService} from "../game-admin.service";

@Component({
  selector: 'app-game-create',
  templateUrl: 'game-create.component.html',
  providers: [GameAdminService]
})


export class GameCreateComponent implements OnInit {

  public game: Game;

  constructor(private router: Router,
              private gameService: GameAdminService) {
  }

  ngOnInit() {
    this.game = new Game();
  }

  onSubmit(): void {
    this.gameService.create(this.game).subscribe(
      (game: Game) => this.router.navigate(['/games']));
  }
}
