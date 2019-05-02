import {Component, OnInit} from '@angular/core';
import {AuthenticationBasicService} from './authentication-basic.service';
import {User} from './user';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-navbar,[app-login-navbar]',
  templateUrl: './login-navbar.component.html',
  styleUrls: [],
})
export class LoginNavbarComponent implements OnInit {

  constructor(private authenticationService: AuthenticationBasicService, private router: Router) {
  }

  ngOnInit() {
  }

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/']);

  }

  getCurrentUserName(): string {
    return this.authenticationService.getCurrentUser().username;
  }

  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  getUser(): User {
    return this.authenticationService.getCurrentUser();
  }
  isAdmin():boolean{
    return this.authenticationService.isAdmin();
  }
  getCurrentUserId(): String{
    return this.authenticationService.getCurrentUser().id;
  }

}
