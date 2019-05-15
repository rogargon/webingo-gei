import {Component, OnInit} from '@angular/core';
import {Game} from "../game";
import {Router} from "@angular/router";
import {GameService} from "../game.service";
import {GameAdminService} from "../game-admin.service";

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  public gamesList: Game[] = [];
  public totalGames = 0;

  constructor(public router: Router,
              private gameService: GameAdminService) {
  }

  ngOnInit() {
    this.gameService.getAll()
      .subscribe(
        (gamesList) => {
          this.gamesList = gamesList.sort((a, b) => a.name.localeCompare(b.name));
          this.totalGames = this.gamesList.length;
        });
  }

  showSearchResults(gamesList) {
    this.gamesList = gamesList;
  }
}
