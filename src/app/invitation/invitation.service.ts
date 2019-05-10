import { Injectable, Injector } from '@angular/core';
import { RestService } from 'angular4-hal-aot';
import { Invitation } from './invitation';
import {Observable} from 'rxjs';

@Injectable()
export class InvitationService extends RestService<Invitation> {

  constructor(injector: Injector) {
    super(Invitation, 'invitations', injector);
  }
  public findByMessageContainingIgnoreCase(text: string): Observable<Invitation[]> {
    const options: any = {params: [{key: 'text', value: text}]};
    return this.search('findByMessageContainingIgnoreCase', options);
  }
}
