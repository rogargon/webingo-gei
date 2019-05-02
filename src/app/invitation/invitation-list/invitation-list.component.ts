import { Component, OnInit } from '@angular/core';
import {User} from "../../login-basic/user";
import {Router} from "@angular/router";
import {PlayerService} from "../../user/player.service";
import {AdminService} from "../../user/admin.service";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-invitation-list',
  templateUrl: './invitation-list.component.html',
  styleUrls: ['./invitation-list.component.css']
})
export class InvitationListComponent implements OnInit {

  public users: User[] = [];
  public totalUsers = 0;

  constructor(
    public router: Router,
    private playerService: PlayerService,
    private adminService: AdminService) {
  }

  ngOnInit() {
    forkJoin(
      this.playerService.getAll(),
      this.adminService.getAll())
      .subscribe(
        ([players, admins]) => {
          this.users = players.concat(admins).sort(
            (a: User, b: User) => a.username.localeCompare(b.username)
          );
          this.totalUsers = this.users.length;
        });
  }

  showSearchResults(users) {
    this.users = users;
  }
}
