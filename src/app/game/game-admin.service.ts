import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../login-basic/user';
import {Game} from "./game";
import {JSDocTagName} from "@angular/compiler/src/output/output_ast";

@Injectable()
export class GameAdminService {

  constructor(private http: HttpClient) {
  }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

  // GET /admins
  getAll(): Observable<Game[]> {
    return this.http.get(`${environment.API}/games`).pipe(
      map((res: any) => res._embedded.admins)
    );
  }

  // GET /admins/{id}
  get(id: string): Observable<Game> {
    return this.http.get<Game>(`${environment.API}/games/${id}`);
  }

  // POST /admins
  create(game: Game): Observable<Game> {
    const body = JSON.stringify(game);
    return this.http.post<Game>(`${environment.API}/ganes`, body, this.getHttpOptions());
  }

  // PUT /admins/{id}
  update(game: Game): Observable<Game> {
    const body = JSON.stringify(game);
    return this.http.put<Game>(`${environment.API}${game.uri}`, body, this.getHttpOptions());
  }

  // DELETE /admins/{id}
  delete(game: Game): Observable<Response> {
    return this.http.delete<Response>(`${environment.API}${game.uri}`);
  }

  // GET /admins/search/findByUsernameContaining?text={text}
  findGameByName(text: string): Observable<Game[]> {
    return this.http.get(`${environment.API}/games/search/findGameByName?text=${text}`).pipe(
      map((res: any) => res._embedded.games)
    );
  }
}
