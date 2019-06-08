import {Component, OnInit} from '@angular/core';
import {Game} from '../game/game';
import {Router} from '@angular/router';
import {GameAdminService} from '../game/game-admin.service';
import {AuthenticationBasicService} from '../login-basic/authentication-basic.service';
import Swal from "sweetalert2";
import {Card} from '../card/card';
import {CardService} from '../card/card.service';

@Component({
  selector: 'app-about',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public gamesList: Game[] = [];
  public gamesPlaying: Game[] = [];
  public gamesFinished: Game[] = [];
  public totalGames = 0;
  private card: Card;

  constructor(public router: Router,
              private gameService: GameAdminService,
              private cardService: CardService,
              private authenticationService: AuthenticationBasicService,
  ) {}

  ngOnInit() {
    this.gameService.getAll()
      .subscribe((gamesList) => {
          gamesList.forEach(g => console.log(g.status));
          this.gamesList = gamesList.filter( g => g.status === 'LOADING');
          this.gamesFinished = gamesList.filter( g => g.status === 'FINISHED');
          this.totalGames = this.gamesList.length;
      });
  }

  showLoadingMessage(game) {
    Swal.fire({
      title: 'Get ready to play!',
      html: 'Loading...',
      timer: 2000,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    }).then((result) => {
      this.card = new Card();
      this.card.game = game.uri;
      this.cardService.create(this.card).subscribe(
        (card: Card) => this.router.navigate([game.uri])
      );
    });
  }

  manageGame(game){
    this.router.navigate([game.uri+'/manage']);
  }

  isAdmin() {
    return this.authenticationService.isAdmin();
  }
}
