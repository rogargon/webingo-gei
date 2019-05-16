import { Injectable, Injector } from '@angular/core';
import { RestService} from 'angular4-hal-aot';
import { Invitation } from './invitation';
import { Observable } from 'rxjs';
import { User } from '../login-basic/user';

@Injectable()
export class InvitationService extends RestService<Invitation> {

  constructor(injector: Injector) {
    super(Invitation, 'invitations', injector);
  }

  public findByMessageContainingIgnoreCase(text: string): Observable<Invitation[]> {
    const options: any = {params: [{key: 'text', value: text}]};
    return this.search('findByMessageContainingIgnoreCase', options);
  }

  public findByInvites(user: User, pagesize: any, sorting: any): Observable<Invitation[]> {
    const options: any = {
      params: [{key: 'invites', value: user.uri}],
      size: pagesize,
      sort: sorting
    };
    return this.search('findByInvites', options);
  }

  public findByCreatedBy(user: User, pagesize: any, sorting: any): Observable<Invitation[]> {
    const options: any = {
      params: [{key: 'createdBy', value: user.uri}],
      size: pagesize,
      sort: sorting
    };
    return this.search('findByCreatedBy', options);
  }
}
