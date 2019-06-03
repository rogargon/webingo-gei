import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {AuthenticationBasicService} from './authentication-basic.service';
import {ErrorMessageService} from '../error-handler/error-message.service';
import Swal from 'sweetalert2';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(private authentication: AuthenticationBasicService,) {
  }

  canActivate(): boolean {
    if (!this.authentication.isLoggedIn()) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000
      });
      Toast.fire({
        type: 'error',
        title: 'You should be logged in to perform this action'
      });
    }
    return this.authentication.isLoggedIn();
  }
}
