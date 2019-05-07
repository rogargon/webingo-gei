import { Injectable, Injector } from '@angular/core';
import { RestService } from 'angular4-hal-aot';
import { Invitation } from './invitation';

@Injectable()
export class InvitationService extends RestService<Invitation> {

  constructor(injector: Injector) {
    super(Invitation, 'invitations', injector);
  }
}
