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
  public games: Game[] = [];
  public totalGames = 0;
  public page = 1;
  public pageSize = 2;

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
          this.games = this.gamesList;
        });
  }

  isAdmin() {
    return this.authenticationService.isAdmin();
  }

  showSearchResults(gamesList) {
    this.gamesList = gamesList;
    this.openTabStatus(onclick,'search');
  }

  openTabStatus(evt, status) {
    var i, tablinks;
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    evt.currentTarget.className += " active";

    if(status == "loading"){
      this.gamesList = this.games.filter( g => g.status === 'LOADING').sort((a, b) => a.name.localeCompare(b.name));
    }else if(status == "playing"){
      this.gamesList = this.games.filter( g => g.status === 'PLAYING').sort((a, b) => a.name.localeCompare(b.name));
    }else{
      this.gamesList = this.games.filter( g => g.status === 'FINISHED').sort((a, b) => a.name.localeCompare(b.name));
    }
    this.page=1;
  }

  changePage() {
    this.gameService.page(this.page - 1).subscribe(
      (games: Game[]) => this.gamesList = games);
  }
}
