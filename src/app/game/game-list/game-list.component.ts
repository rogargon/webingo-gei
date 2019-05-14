import { Component, OnInit } from '@angular/core';
import {Game} from "../game";
import {Router} from "@angular/router";
import {GameService} from "../game.service";
import {forkJoin} from "rxjs";
import {Sort} from "angular4-hal-aot";

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  public games: Game[] = [];
  public totalGames = 0;
  public pagesize = 10;
  public page = 1;
  private sorting: Sort[] = [{path:'Name', order:'ASC'}];

  constructor(public router: Router,
              private gameService: GameService) { }

  ngOnInit() {
    this.gameService.getAll({size: this.pagesize, sort: this.sorting}).subscribe(
      (games:Game[]) => {
        this.games = games;
        this.totalGames = this.gameService.totalElement();
      }
    )
  }

  showSearchResults(games) {
    this.games = games;
  }
}
