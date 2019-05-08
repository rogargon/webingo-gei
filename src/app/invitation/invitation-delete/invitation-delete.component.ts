import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvitationService } from '../invitation.service';
import {Invitation} from '../invitation';

@Component({
  selector: 'app-invitation-delete',
  templateUrl: './invitation-delete.component.html'
})
export class InvitationDeleteComponent implements OnInit {
  public invitation: Invitation = new Invitation();
  constructor(private route: ActivatedRoute,
              private invitationService: InvitationService,
              private router: Router) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.invitationService.get(id).subscribe(
      invitation => this.invitation = invitation);
  }

  delete() {
    this.invitationService.delete(this.invitation).subscribe(
      () => this.router.navigate(['invitations']));
  }
}
