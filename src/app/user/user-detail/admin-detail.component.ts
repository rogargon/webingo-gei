import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { Admin } from '../admin';
import Swal from "sweetalert2";
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';

@Component({
  selector: 'app-admin-detail',
  templateUrl: './user-detail.component.html'
})
export class AdminDetailComponent implements OnInit {
  public user: Admin = new Admin();

  constructor(private route: ActivatedRoute,
              private adminService: AdminService,
              private authenticationService: AuthenticationBasicService,
              private router: Router) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.adminService.get(id).subscribe(
      admin => this.user = admin);
  }
  isAdmin(){
    return this.authenticationService.isAdmin();
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
        this.adminService.delete(this.user).subscribe(
          () => this.router.navigate(['users']));
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'The player ' + this.user.username + ' has been deleted',
          'success'
        )
      }
    })
  }
}
