import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from '../player.service';
import { Player } from '../player';
import {Invitation} from '../invitation';
import {InvitationService} from '../invitation.service';

@Component({
  selector: 'app-player-detail',
  templateUrl: './invitation-detail.component.html'
})
export class InvitationDetailComponent implements OnInit {
  public invitation: Invitation = new Invitation();

  constructor(private route: ActivatedRoute,
              private invitationService: InvitationService,
              private router: Router) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.invitationService.get(id).subscribe(
      player => this.user = player);
  }

  public delete() {
    this.playerService.delete(this.user).subscribe(
      () => this.router.navigate(['users']));
  }
}
