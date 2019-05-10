import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { User } from '../../login-basic/user';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: '../user-form/user-form.component.html'
})
export class AdminEditComponent implements OnInit {
  public user: User = new User();
  constructor(private route: ActivatedRoute,
              private router: Router,
              private adminService: AdminService,
              private authenticationService: AuthenticationBasicService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.adminService.get(id).subscribe(
      admin => this.user = admin);
  }

  onSubmit(): void {
      this.user.authorities = []; // This field is not editable
      this.adminService.update(this.user)
      .subscribe(
        (admin: User) => this.router.navigate([admin.uri]));
  }
  isAdmin() {
    return this.authenticationService.isAdmin();
  }

  getCurrentUserId(): string {
    return this.authenticationService.getCurrentUser().id;
  }
}
