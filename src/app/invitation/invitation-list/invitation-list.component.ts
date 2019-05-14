import { Component, OnInit } from '@angular/core';
import {forkJoin} from 'rxjs';
import {Invitation} from '../invitation';
import {InvitationService} from '../invitation.service';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';


@Component({
  selector: 'app-invitation-list',
  templateUrl: './invitation-list.component.html',
  styleUrls: ['./invitation-list.component.css']
})
export class InvitationListComponent implements OnInit {

  public invitations: Invitation[] = [];
  public totalInvitations = 0;

  constructor(
    private invitationService: InvitationService,
    private authenticationService: AuthenticationBasicService) {
    }

  ngOnInit() {
      this.invitationService.getAll()
      .subscribe(
        (invitations) => {
          this.invitations = invitations;
          this.totalInvitations = this.invitations.length;
          console.log(this.invitations);
        });
  }

  showSearchResults(invitations) {
    this.invitations = invitations;
  }
  isAdmin(): boolean {
    return this.authenticationService && this.authenticationService.isAdmin();
  }
}
