import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GameService} from "../game.service";
import {Game} from "../game";
import {GameAdminService} from "../game-admin.service";
import {AuthenticationBasicService} from "../../login-basic/authentication-basic.service";

@Component({
  selector: 'app-game-manage',
  templateUrl: 'game-manage.component.html',
})


export class GameManageComponent implements OnInit {

  public game: Game = new Game();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationBasicService,
              private gameService: GameAdminService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.gameService.get(id).subscribe(game => {
        this.game = game;
      }
    );
  }

  isAdmin() {
    return this.authenticationService.isAdmin();
  }
}
