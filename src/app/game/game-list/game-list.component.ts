import {Component, OnInit} from '@angular/core';
import {Game} from '../game';
import {Router} from '@angular/router';
import {GameAdminService} from '../game-admin.service';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  public gamesList: Game[] = [];
  public totalGames = 0;

  constructor(public router: Router,
              private gameService: GameAdminService,
              private authenticationService: AuthenticationBasicService) {
  }

  ngOnInit() {
    this.gameService.getAll()
      .subscribe(
        (gamesList) => {
          this.gamesList = gamesList.sort((a, b) => a.name.localeCompare(b.name));
          this.totalGames = this.gamesList.length;
        });
  }

  isAdmin() {
    return this.authenticationService.isAdmin();
  }

  showSearchResults(gamesList) {
    this.gamesList = gamesList;
  }
}
