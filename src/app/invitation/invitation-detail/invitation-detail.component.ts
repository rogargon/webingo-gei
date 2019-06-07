import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvitationService } from '../invitation.service';
import { Invitation } from '../invitation';
import { Player } from '../../user/player';
import { Game } from '../../game/game';

@Component({
  selector: 'app-invitation-detail',
  templateUrl: './invitation-detail.component.html',
  styleUrls: ['./invitation-detail.component.css']
})
export class InvitationDetailComponent implements OnInit {

  public invitation: Invitation = new Invitation();
  createdBy: Player = new Player();
  invites: Player = new Player();
  invitesTo: Game = new Game();

  constructor(private route: ActivatedRoute,
              private invitationService: InvitationService,
              private router: Router) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.invitationService.get(id).subscribe(
      invitation => {
        this.invitation = invitation;

        invitation.getRelation(Player, 'createdBy').subscribe(
          createdBy => {
          this.createdBy = createdBy;
        });
        invitation.getRelation(Player, 'invites').subscribe(
          invites => {
            this.invites = invites;
          });

        invitation.getRelation(Game, 'invitesTo').subscribe(
          invitesTo => {
            this.invitesTo = invitesTo;
          });
      });
  }

  public delete() {
    this.invitationService.delete(this.invitation).subscribe(
      () => this.router.navigate(['users']));
  }
}
