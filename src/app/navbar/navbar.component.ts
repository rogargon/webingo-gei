import {Component, OnInit} from '@angular/core';
import {AuthenticationBasicService} from '../login-basic/authentication-basic.service';
import { FormControl } from '@angular/forms';
import {ThemeService} from "../theme.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isCollapsed: boolean;
  darkTheme =  new FormControl(false);

  constructor(private authenticationService: AuthenticationBasicService, private themeService: ThemeService) {
    this.darkTheme.valueChanges.subscribe(value => {
      if (value) {
        this.themeService.toggleDark();
      } else {
        this.themeService.toggleLight();
      }
    });
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
}
