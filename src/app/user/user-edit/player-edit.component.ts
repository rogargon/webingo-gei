import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PlayerService } from '../player.service';
import { User } from '../../login-basic/user';
import {Player} from '../player';

@Component({
  selector: 'app-user-edit',
  templateUrl: '../user-form/user-form.component.html'
})
export class PlayerEditComponent implements OnInit {
  public user: Player = new Player();
  constructor(private route: ActivatedRoute,
              private router: Router,
              private playerService: PlayerService) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.playerService.get(id).subscribe(
      player => this.user = player);
  }

  onSubmit(): void {
      this.user.authorities = []; // This field is not editable
      this.playerService.update(this.user)
      .subscribe(
        (player: Player) => this.router.navigate([player.uri]));
  }
}
