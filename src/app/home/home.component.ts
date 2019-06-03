import {Component, OnInit} from '@angular/core';
import {Game} from '../game/game';
import {Router} from '@angular/router';
import {GameAdminService} from '../game/game-admin.service';
import {AuthenticationBasicService} from '../login-basic/authentication-basic.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-about',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public gamesList: Game[] = [];
  public totalGames = 0;

  constructor(public router: Router, private gameService: GameAdminService) {}

  ngOnInit() {
    this.gameService.getAll()
      .subscribe((gamesList) => {
          gamesList.forEach(g => console.log(g.status));
          this.gamesList = gamesList.filter( g => g.status === 'LOADING');
          this.totalGames = this.gamesList.length;
      });
  }

  showLoadingMessage(uri) {
    Swal.fire({
      title: 'Get ready to play!',
      html: 'Loading...',
      timer: 2000,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    }).then((result) => {
      this.router.navigate([uri]);
    });
  }
}
