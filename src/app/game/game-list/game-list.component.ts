import {Component, OnInit} from '@angular/core';
import {Game} from "../game";
import {Router} from "@angular/router";
import {GameService} from "../game.service";

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  public games: Game[] = [];
  public totalGames = 0;

  constructor(public router: Router,
              private gameService: GameService) {
  }

  ngOnInit() {
    this.gameService.getAll()
      .subscribe(
        (games) => {
          this.games = games;
          this.totalGames = this.games.length;
          console.log(this.games);
        });
  }

  showSearchResults(games) {
    console.log(games);
    this.games = games;
  }
}
