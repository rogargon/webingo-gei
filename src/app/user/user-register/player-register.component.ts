import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../login-basic/user';
import { PlayerService } from '../player.service';
import { Player } from '../player';
import Swal from 'sweetalert2';

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
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000
    });
    Toast.fire({
      type: 'success',
      title: 'User registered successfully'
    });

    this.playerService.create(this.user).subscribe(
      // (user: Player) => this.router.navigate([user.uri])
    );
    this.router.navigateByUrl('/login');
  }
}
