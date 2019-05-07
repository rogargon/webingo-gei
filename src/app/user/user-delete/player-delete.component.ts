import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from '../player.service';
import {Player} from '../player';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html'
})
export class PlayerDeleteComponent implements OnInit {
  public user: Player = new Player();
  private id: string;
  private type: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private playerService: PlayerService) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.playerService.get(this.id).subscribe(
      player => this.user = player);
  }

  delete() {
    this.playerService.delete(this.user).subscribe(
      () => this.router.navigate(['users']));
  }
}
