import {Component, OnInit} from '@angular/core';
import {Game} from '../game';
import {Router} from '@angular/router';
import {GameAdminService} from '../game-admin.service';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';
import {Invitation} from "../../invitation/invitation";

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  public gamesList: Game[] = [];
  public gamesLoading: Game[] = [];
  public gamesPlaying: Game[] = [];
  public gamesFinished: Game[] = [];
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
          this.gamesLoading = gamesList.filter( g => g.status === 'LOADING').sort((a, b) => a.name.localeCompare(b.name));
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
    this.openTabStatus(onclick,'search');
  }

  openTabStatus(evt, status) {
    var i, elementClass, tablinks;
    /*
    elementClass = document.getElementsByClassName("tabcontent");
    for (i = 0; i < elementClass.length; i++) {
      elementClass[i].style.display = "none";
    }
     */
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    evt.currentTarget.className += " active";
    //document.getElementById(status).style.display = "block";
    if(status == "loading"){
      this.gamesList = this.gamesLoading;
    }else if(status == "playing"){
      this.gamesList = this.gamesPlaying;
    }else{
      this.gamesList = this.gamesFinished;
    }
  }

  changePage() {
    this.gameService.page(this.page - 1).subscribe();
  }
}
