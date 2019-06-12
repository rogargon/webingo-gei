import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {User} from '../../login-basic/user';
import {PlayerService} from '../player.service';
import {AdminService} from '../admin.service';
import {forkJoin} from 'rxjs';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';
import {Invitation} from "../../invitation/invitation";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  public users: User[] = [];
  public totalUsers = 0;

  constructor(
    public router: Router,
    private playerService: PlayerService,
    private adminService: AdminService,
    private authenticationService: AuthenticationBasicService) {
  }

  ngOnInit() {
    if (this.authenticationService.isAdmin()) {
      forkJoin(
        this.playerService.getAll(),
        this.adminService.getAll())
        .subscribe(
          ([players, admins]) => {
            this.users = (players as User[]).concat(admins).sort(
              (a: User, b: User) => a.username.localeCompare(b.username)
            );
            this.totalUsers = this.users.length;
          });
    } else {
      this.playerService.getAll().subscribe(players => {
        this.users = players.sort(
          (a: User, b: User) => a.username.localeCompare(b.username));
        this.totalUsers = this.users.length;
      });
    }
  }

  showSearchResults(users) {
    this.users = users;
  }

  isAdmin() {
    return this.authenticationService.isAdmin();
  }
}
