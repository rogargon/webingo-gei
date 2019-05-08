import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Invitation} from "../invitation";
import {InvitationService} from "../invitation.service";
import {PlayerService} from "../../user/player.service";
import {Player} from "../../user/player";

@Component({
  selector: 'app-invitation-create',
  templateUrl: '../invitation-form/invitation-form.component.html',
  providers: [InvitationService, PlayerService]
})


export class InvitationCreateComponent implements OnInit {

  public invitation: Invitation;
  //public invitationForm: FormGroup;
  public players: Player[] = [];
  public totalPlayers = 0;
  public errorMessage: string;

  constructor(private router: Router,
              private invitationService: InvitationService,
              /*private formBuilder: FormBuilder,*/
              private playerService: PlayerService) {

   /* this.invitationForm = formBuilder.group({
      'message': ['Game invitation message', Validators.required]
    });*/
  }

  ngOnInit() {
   /* this.playerService.getAll() //TODO: Get the list of players once player team upload their changes
      .subscribe(
        (players: Player[]) => {
          this.players = players;
          this.totalPlayers = players.length; },
        error => this.errorMessage = <any>error.message);
*/
    this.invitation = new Invitation();
  }

  onSearch(players) {
    this.players = players;
  }
  onSubmit(): void {
    this.invitationService.create(this.invitation).subscribe(
      (invitation: Invitation) => this.router.navigate(['/invitations', { id: invitation.id}]));


  }

  storeInvitedPlayer(username): void {
    this.invitation.setInvitedPlayer(username);
    //console.log(username);
    }
}
