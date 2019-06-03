import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { Game } from '../game';
import { GameAdminService } from '../game-admin.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Invitation } from '../../invitation/invitation';
import { Player } from '../../user/player';
import { PlayerService } from '../../user/player.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls : ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {

  public game: Game = new Game();
  public invitation: Invitation;
  public players: Player[] = [];

  constructor(private route: ActivatedRoute,
              private gameService: GameAdminService,
              private authenticationService: AuthenticationBasicService,
              private router: Router,
              private playerService: PlayerService,
              private authentication: AuthenticationBasicService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.gameService.get(id).subscribe(game => {
        this.game = game;
      }
    );

    this.playerService.getAll()
      .subscribe(
        players => {
          const user = this.authentication.getCurrentUser();
          this.players = players.filter(player => {
            return player.id !== user.id;
          });
        });

    this.invitation = new Invitation();
  }

  openModal(content, id) {
    this.modalService.open(content, {ariaLabelledBy: id}).result.
    then((result) => {
    }, (reason) => {
    });
  }

  isAdmin() {
    return this.authenticationService.isAdmin();
  }

  public delete() {
    this.gameService.delete(this.game).subscribe(
      () => this.router.navigate(['games']));
    Swal.fire(
      'Deleted!',
      'The game "' + this.game.name + '" has been deleted',
      'success'
    );
  }
}
