import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../login-basic/user';
import { PlayerService } from '../player.service';
import { Player } from '../player';

@Component({
  selector: 'app-player-register',
  templateUrl: './player-register-form.html'
})
export class PlayerRegisterComponent implements OnInit {
  public user: Player;

  constructor(private router: Router,
              private playerService: PlayerService) {
  }

  ngOnInit() {
    this.user = new Player();

  }

  onSubmit(): void {

    this.playerService.create(this.user).subscribe(
      (player: Player) => this.router.navigate([player.uri]));
    this.router.navigateByUrl('/login');
  }
}
