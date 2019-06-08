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
  public gamesPlaying: Game[] = [];
  public gamesFinished: Game[] = [];
  public totalGames = 0;

  constructor(public router: Router,
              private gameService: GameAdminService,
              private authenticationService: AuthenticationBasicService) {
  }

  ngOnInit() {
    this.gameService.getAll()
      .subscribe(
        (gamesList) => {
          this.gamesList = gamesList.filter( g => g.status === 'LOADING').sort((a, b) => a.name.localeCompare(b.name));
          this.gamesPlaying = gamesList.filter( g => g.status === 'PLAYING').sort((a, b) => a.name.localeCompare(b.name));
          this.gamesFinished = gamesList.filter( g => g.status === 'FINISHED').sort((a, b) => a.name.localeCompare(b.name));
          this.totalGames = this.gamesList.length;
        });
  }

  isAdmin() {
    return this.authenticationService.isAdmin();
  }

  showSearchResults(gamesList) {
    this.gamesList = gamesList;
  }

  openTabStatus(evt, status) {
    var i, elementClass, tablinks;
    elementClass = document.getElementsByClassName("tabcontent");
    for (i = 0; i < elementClass.length; i++) {
      elementClass[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(status).style.display = "block";
    evt.currentTarget.className += " active";
  }
}
