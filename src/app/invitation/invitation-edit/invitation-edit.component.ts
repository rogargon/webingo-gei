import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Invitation} from '../invitation';
import {InvitationService} from '../invitation.service';
import {PlayerService} from "../../user/player.service";
import {AuthenticationBasicService} from "../../login-basic/authentication-basic.service";
import {Player} from "../../user/player";

@Component({
  selector: 'app-invitation-edit',
  templateUrl: '../invitation-form/invitation-form.component.html',
  styleUrls : ['../invitation-form/invitation-form.css']
})
export class InvitationEditComponent implements OnInit {

  public invitation: Invitation = new Invitation();
  public players: Player[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private invitationService: InvitationService,
              private playerService: PlayerService,
              private authentication: AuthenticationBasicService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.invitationService.get(id).subscribe(
      invitation => this.invitation = invitation);

    this.playerService.getAll()
      .subscribe(
        players => {
          const user = this.authentication.getCurrentUser();
          this.players = players.filter(player => {
            return player.id !== user.id;
          });
        });
  }

  onSubmit(): void {
    // this.invitation.authorities = []; // This field is not editable
    this.invitationService.update(this.invitation)
      .subscribe(
        (invitation: Invitation) => this.router.navigate(['/invitations']));
  }

}
