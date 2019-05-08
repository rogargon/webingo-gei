import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Invitation} from '../invitation';
import {InvitationService} from '../invitation.service';

@Component({
  selector: 'app-invitation-edit',
  templateUrl: '../invitation-form/invitation-form.component.html'
})
export class InvitationEditComponent implements OnInit {
  public invitation: Invitation = new Invitation();
  constructor(private route: ActivatedRoute,
              private router: Router,
              private invitationService: InvitationService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.invitationService.get(id).subscribe(
      invitation => this.invitation = invitation);
  }

  onSubmit(): void {
    // this.invitation.authorities = []; // This field is not editable
    this.invitationService.update(this.invitation)
      .subscribe(
        (invitation: Invitation) => this.router.navigate([invitation.uri]));
  }

}
