import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';
import {Game} from "../game";
import {GameAdminService} from "../game-admin.service";

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html'
})
export class GameEditComponent implements OnInit {
  public game: Game = new Game();

  constructor(private route: ActivatedRoute,
              private gameService: GameAdminService,
              private authenticationService: AuthenticationBasicService,
              private router: Router) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.gameService.get(id).subscribe(game => {
        this.game = game;
      }
    );
  }

  isAdmin() {
    return this.authenticationService.isAdmin();
  }

  public delete() {
    this.gameService.delete(this.game).subscribe(
      () => this.router.navigate(['games']));
    Swal.fire(
      'Deleted!',
      'The game ' + this.game.name + ' has been deleted',
      'success'
    );
  }

  onSubmit(): void {
    this.gameService.update(this.game).subscribe(
      (game: Game) => this.router.navigate(['/games']));
    Swal.fire(
      'Edited!',
      'The game ' + this.game.name + ' has been edited',
      'success'
    );
  }
}
