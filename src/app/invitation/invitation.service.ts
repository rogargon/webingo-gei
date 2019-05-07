import { Injectable, Injector } from '@angular/core';
import { RestService } from 'angular4-hal-aot';
import { Invitation } from './invitation';
import {User} from "../login-basic/user";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Injectable()
export class InvitationService {

  constructor(private http: HttpClient) {
  }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }
  // POST /admins
  create(invitation: Invitation): Observable<Invitation> {
    const body = JSON.stringify(invitation);
    return this.http.post<Invitation>(`${environment.API}/invitations`, body, this.getHttpOptions());
  }
}
