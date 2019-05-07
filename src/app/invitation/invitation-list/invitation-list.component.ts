import { Component, OnInit } from '@angular/core';
import {forkJoin} from 'rxjs';
import {Invitation} from '../invitation';
import {InvitationService} from '../invitation.service';

@Component({
  selector: 'app-invitation-list',
  templateUrl: './invitation-list.component.html',
  styleUrls: ['./invitation-list.component.css']
})
export class InvitationListComponent implements OnInit {

  public invitations: Invitation[] = [];
  public totalInvitations = 0;

  constructor(
    private invitationService: InvitationService) {
    }

  ngOnInit() {
    forkJoin(
      this.invitationService.getAll())
      .subscribe(
        ([invitations]) => {
          this.invitations = invitations;
          this.totalInvitations = this.invitations.length;
          console.log(this.invitations);
        });
  }

  showSearchResults(invitations) {
    this.invitations = invitations;
  }
}
