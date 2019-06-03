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
import { InvitationService } from '../../invitation/invitation.service';
import {Card} from '../../card/card';
import {CardService} from '../../card/card.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls : ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {

  public game: Game = new Game();
  public invitation: Invitation;
  public players: Player[] = [];

  public card: Card;
  constructor(private route: ActivatedRoute,
              private gameService: GameAdminService,
              private cardService: CardService,
              private authenticationService: AuthenticationBasicService,
              private router: Router,
              private invitationService: InvitationService,
              private playerService: PlayerService,
              private authentication: AuthenticationBasicService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.gameService.get(id).subscribe(game => {
        this.game = game;
        this.cardService.findByGame(game.uri).subscribe(card => {
          this.card = card[0];
        }
      );
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

  onSubmit(): void {
    this.invitation.invitesTo = this.game;
    this.invitationService.create(this.invitation).subscribe(
      (invitation: Invitation) => this.modalService.dismissAll());
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
