import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Admin} from "../../user/admin";
import {Invitation} from "../invitation";
import {InvitationService} from "../invitation.service";

@Component({
  selector: 'app-invitation-create',
  templateUrl: '../invitation-form/invitation-form.component.html'
})


export class InvitationCreateComponent implements OnInit {

  public invitation: Invitation;

  constructor(private router: Router,
              private invitationService: InvitationService) {
  }

  ngOnInit() {
    this.invitation = new Invitation();
  }

  onSubmit(): void {
    this.invitationService.create(this.invitation).subscribe(
      (admin: Admin) => this.router.navigate([admin.uri]));
  }
}
