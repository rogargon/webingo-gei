import { Component, OnInit } from '@angular/core';
import { Invitation } from '../invitation';
import { InvitationService } from '../invitation.service';
import { AuthenticationBasicService } from '../../login-basic/authentication-basic.service';
import { Sort } from 'angular4-hal-aot';
import { forkJoin } from 'rxjs';
import { Game } from '../../game/game';
import { Router } from '@angular/router';


@Component({
  selector: 'app-invitation-list',
  templateUrl: './invitation-list.component.html',
  styleUrls: ['./invitation-list.component.css']
})
export class InvitationListComponent implements OnInit {

  public invitations: Invitation[] = [];
  public pageSize = 10;
  public page = 1;
  public totalInvitations = 0;
  private sorting: Sort[] = [{ path: 'id', order: 'ASC' }];

  constructor(
    private invitationService: InvitationService,
    private router: Router,
    private authenticationService: AuthenticationBasicService) {
    }

  ngOnInit() {
    if (this.isAdmin()) {
      this.invitationService.getAll({size: this.pageSize, sort: this.sorting})
        .subscribe(
          (invitations) => {
            this.invitations = invitations;
            this.totalInvitations = this.invitationService.totalElement();
          });
    } else {
      forkJoin(
        this.invitationService.findByInvites(this.authenticationService.getCurrentUser(), this.pageSize, this.sorting),
        this.invitationService.findByCreatedBy(this.authenticationService.getCurrentUser(), this.pageSize, this.sorting))
          .subscribe(
            ([invites, createdby]) => {
              this.invitations = invites.concat(createdby);
              this.totalInvitations = this.invitationService.totalElement();
            });
    }
  }

  showSearchResults(invitations) {
    this.invitations = invitations;
  }

  isAdmin(): boolean {
    return this.authenticationService && this.authenticationService.isAdmin();
  }

  changePage() {
    this.invitationService.page(this.page - 1).subscribe(
      (invitations: Invitation[]) => this.invitations = invitations);
  }

  deleteInvitation(invitation) {
    this.invitationService.delete(invitation).subscribe( (result) => {
      this.invitations = this.invitations.filter(obj => obj.id !== invitation.id);
      this.totalInvitations--;
    });
  }

  acceptInvitation(invitation) {
    invitation.getRelation(Game, 'invitesTo').subscribe(
      invitesTo => {
        this.deleteInvitation(invitation);
        this.router.navigate(['/games/' + invitesTo.id]);
      });
  }
}
