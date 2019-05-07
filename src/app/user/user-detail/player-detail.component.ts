import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PlayerService} from '../player.service';
import {Player} from '../player';
import Swal from 'sweetalert2';
import {CardService} from '../../card/card.service';

@Component({
  selector: 'app-player-detail',
  templateUrl: './user-detail.component.html'
})
export class PlayerDetailComponent implements OnInit {
  public player: Player = new Player();

  constructor(private route: ActivatedRoute,
              private playerService: PlayerService,
              private cardService: CardService,
              private router: Router) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.playerService.get(id).subscribe(
      player => {
        this.player = player;
        this.cardService.getBySelfLink(player._links.card.href).subscribe(
          card => {
            this.player.card = card;
          }
        );
      });
  }

  public delete() {

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: 'm-1',
      confirmButtonText: 'Delete it!',
      cancelButtonClass: 'm-1',
      cancelButtonText: 'Cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.playerService.delete(this.player).subscribe(
          () => this.router.navigate(['users']));
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'The player ' + this.player.username + ' has been deleted',
          'success'
        );
      }
    });

  }
}
