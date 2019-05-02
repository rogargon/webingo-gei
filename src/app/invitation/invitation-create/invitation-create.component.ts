import { Component, OnInit } from '@angular/core';
import {User} from "../../login-basic/user";
import {Router} from "@angular/router";
import {AdminService} from "../../user/admin.service";
import {Admin} from "../../user/admin";

@Component({
  selector: 'app-invitation-create',
  templateUrl: '../invitation-form/invitation-form.component.html'
})


export class InvitationCreateComponent implements OnInit {

  public user: User;

  constructor(private router: Router,
              private adminService: AdminService) {
  }

  ngOnInit() {
    this.user = new Admin();
  }

  onSubmit(): void {
    this.adminService.create(this.user).subscribe(
      (admin: Admin) => this.router.navigate([admin.uri]));
  }
}
