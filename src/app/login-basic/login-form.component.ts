import {Component, OnInit} from '@angular/core';
import {AuthenticationBasicService} from './authentication-basic.service';
import {Location} from '@angular/common';
import Swal from "sweetalert2";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: [],
})
export class LoginFormComponent implements OnInit {

  constructor(private authenticationService: AuthenticationBasicService,
              private location: Location) {
  }

  ngOnInit() {
  }

  onSubmit(userInput: HTMLInputElement, passwordInput: HTMLInputElement): void {


    this.authenticationService.login(userInput.value, passwordInput.value)
      .subscribe(
        user => {
          this.authenticationService.storeCurrentUser(user);
          this.location.back();
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000
          });
          Toast.fire({
            type: 'success',
            title: 'Signed in successfully'
          });
        });

  }

  onCancel(): void {
    this.location.back();
  }
}
