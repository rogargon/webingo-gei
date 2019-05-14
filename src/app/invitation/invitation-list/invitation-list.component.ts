import { Component, OnInit } from '@angular/core';
import {forkJoin} from 'rxjs';
import {Invitation} from '../invitation';
import {InvitationService} from '../invitation.service';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';
import { Sort } from 'angular4-hal-aot';


@Component({
  selector: 'app-invitation-list',
  templateUrl: './invitation-list.component.html',
  styleUrls: ['./invitation-list.component.css']
})
export class InvitationListComponent implements OnInit {

  public invitations: Invitation[] = [];
  public pageSize = 12;
  public page = 1;
  public totalInvitations = 0;
  private sorting: Sort[] = [{ path: 'id', order: 'ASC' }];

  constructor(
    private invitationService: InvitationService,
    private authenticationService: AuthenticationBasicService) {
    }

  ngOnInit() {
      this.invitationService.getAll({size: this.pageSize, sort: this.sorting})
      .subscribe(
        (invitations) => {
          this.invitations = invitations;
          this.totalInvitations = this.invitationService.totalElement();
          console.log(this.invitations);
        });
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
}
