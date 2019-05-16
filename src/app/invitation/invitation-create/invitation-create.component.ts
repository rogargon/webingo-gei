import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Invitation} from "../invitation";
import {InvitationService} from "../invitation.service";
import {PlayerService} from "../../user/player.service";
import {Player} from "../../user/player";

@Component({
  selector: 'app-invitation-create',
  templateUrl: '../invitation-form/invitation-form.component.html',
  styleUrls : ['../invitation-form/invitation-form.css'],
  providers: [InvitationService, PlayerService]
})


export class InvitationCreateComponent implements OnInit {

  public invitation: Invitation;
  // public invitationForm: FormGroup;
  public players: Player[] = [];
  public totalPlayers = 0;
  public errorMessage: string;
  asd: Player = new Player();

  constructor(private router: Router,
              private invitationService: InvitationService,
              private playerService: PlayerService) {
  }

  ngOnInit() {
    this.playerService.getAll()
      .subscribe(
        players => {
          this.players = players;
        });
    this.invitation = new Invitation();
  }

  onSearch(players) {
    this.players = players;
  }
  onSubmit(): void {
    this.invitationService.create(this.invitation).subscribe(
      (invitation: Invitation) => this.router.navigate(['/invitations']));
  }

  storeInvitedPlayer(username): void {
    this.invitation.setInvitedPlayer(username);
  }
}
