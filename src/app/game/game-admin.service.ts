import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import {Game} from "./game";

@Injectable()
export class GameAdminService {

  constructor(private http: HttpClient) {
  }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  }

  // GET /games
  getAll(): Observable<Game[]> {
    return this.http.get(`${environment.API}/games`).pipe(
      map((res: any) => res._embedded.games)
    );
  }

  // GET /games/{id}
  get(id: string): Observable<Game> {
    return this.http.get<Game>(`${environment.API}/games/${id}`);
  }

  // POST /games
  create(game: Game): Observable<Game> {
    const body = JSON.stringify(game);
    return this.http.post<Game>(`${environment.API}/games`, body, this.getHttpOptions());
  }

  // PUT /games/{id}
  update(game: Game): Observable<Game> {
    const body = JSON.stringify(game);
    return this.http.put<Game>(`${environment.API}${game.uri}`, body, this.getHttpOptions());
  }

  // DELETE /games/{id}
  delete(game: Game): Observable<Response> {
    return this.http.delete<Response>(`${environment.API}${game.uri}`);
  }

  // GET /games/search/findGameByName?text={text}
  findGameByNameContaining(text: string): Observable<Game[]> {
    return this.http.get(`${environment.API}/games/search/findGameByNameContaining?text=${text}`).pipe(
      map((res: any) => res._embedded.games)
    );
  }
}
