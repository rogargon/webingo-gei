import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PlayerService} from '../player.service';
import {Player} from '../player';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-player-detail',
  templateUrl: './user-detail.component.html'
})
export class PlayerDetailComponent implements OnInit {
  public user: Player = new Player();

  constructor(private route: ActivatedRoute,
              private playerService: PlayerService,
              private router: Router) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.playerService.get(id).subscribe(
      player => this.user = player);
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
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass:"m-1",
      confirmButtonText: 'Delete it!',
      cancelButtonClass:"m-1",
      cancelButtonText: 'Cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.playerService.delete(this.user).subscribe(
          () => this.router.navigate(['users']));
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'The user ' + this.user.username + ' has been deleted',
          'success'
        )
      }
    })

  }
}
