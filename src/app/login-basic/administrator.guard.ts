import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {AuthenticationBasicService} from './authentication-basic.service';
import {ErrorMessageService} from '../error-handler/error-message.service';
import Swal from 'sweetalert2';

@Injectable()
export class AdministratorGuard implements CanActivate {

  constructor(private authentication: AuthenticationBasicService,
              private errorMessageService: ErrorMessageService) {
  }

  canActivate(): boolean {
    if (!this.authentication.isLoggedIn() || !this.authentication.isAdmin()) {

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000
      });
      Toast.fire({
        type: 'error',
        title: 'You should be an administrator to perform this action'
      });
      // this.errorMessageService.showErrorMessage('You should be an administrator to perform this action');
    }
    return this.authentication.isLoggedIn() && this.authentication.isAdmin();
  }
}
