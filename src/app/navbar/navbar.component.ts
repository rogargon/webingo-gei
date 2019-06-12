import {Component, OnInit} from '@angular/core';
import {AuthenticationBasicService} from '../login-basic/authentication-basic.service';
import {ThemeService} from "../theme.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isCollapsed: boolean;

  constructor(private authenticationService: AuthenticationBasicService,
              private themeService: ThemeService) {
  }

  ngOnInit() {
    this.isCollapsed = true;
  }

  isLogged() {
    return this.authenticationService.isLoggedIn();
  }

  isAdmin(): boolean {
    return this.authenticationService && this.authenticationService.isAdmin();
  }

  changetheme(theme) {
    if(theme == "darkTheme"){
      this.themeService.toggleDark();
    }else{
      this.themeService.toggleLight();
    }
  }
}
