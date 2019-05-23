import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PlayerService} from '../player.service';
import {Player} from '../player';
import Swal from 'sweetalert2';
import {CardService} from '../../card/card.service';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';
import {Card} from '../../card/card';

@Component({
  selector: 'app-player-detail',
  templateUrl: './user-detail.component.html'
})
export class PlayerDetailComponent implements OnInit {
  public user: Player = new Player();

  constructor(private route: ActivatedRoute,
              private playerService: PlayerService,
              private cardService: CardService,
              private authenticationService: AuthenticationBasicService,
              private router: Router) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.playerService.get(id).subscribe(
      player => {
        this.cardService.getBySelfLink(player._links.card.href).toPromise()
          .then((card: Card) => {
            this.user.card = card;
          })
          .catch(() => console.log('User doesn\'t have card'));
        console.log(player._links.played.href);
        this.cardService.getAll(player._links.played.href).toPromise()
          .then((response) => {
            this.user.played = response;
          })
          .catch(() => console.log('User doesn\'t have Played games'));
        this.user = player;
      });
  }

  isAdmin() {
    return this.user.getAuthorities().includes('ROLE_ADMIN');


  }

  public delete() {
    this.playerService.delete(this.user).subscribe(
      () => this.router.navigate(['users']));
    Swal.fire(
      'Deleted!',
      'The user ' + this.user.username + ' has been deleted',
      'success'
    );
  }
}
