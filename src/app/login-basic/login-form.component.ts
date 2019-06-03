import {Component, OnInit} from '@angular/core';
import {AuthenticationBasicService} from './authentication-basic.service';
import {Location} from '@angular/common';
import Swal from 'sweetalert2';
import {NgForm} from '@angular/forms';
import {User} from './user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: [],
})
export class LoginFormComponent implements OnInit {
  user: User;

  constructor(private authenticationService: AuthenticationBasicService,
              private location: Location,
              private router: Router) {
  }

  ngOnInit() {
    this.user = new User();
  }

  onSubmit(loginForm: NgForm): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000
    });
    if (loginForm.invalid) {

      Toast.fire({
        type: 'error',
        title: 'Don\'t touch my code'
      });
      return;
    }
    this.authenticationService.login(loginForm.controls.username.value, loginForm.controls.password.value)
      .subscribe(
        user => {
          this.authenticationService.storeCurrentUser(user);
          Toast.fire({
            type: 'success',
            title: 'Signed in successfully'
          });
          this.router.navigateByUrl('');
        }, () => {
          Toast.fire({
            type: 'error',
            title: 'Incorrect username or password'
          });
        });
  }

  onCancel(): void {
    this.location.back();
  }
}
