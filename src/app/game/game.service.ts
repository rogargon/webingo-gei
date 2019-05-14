import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {RestService} from 'angular4-hal-aot';
import {Game} from './game';
import {Invitation} from "../invitation/invitation";


@Injectable()
export class GameService extends RestService<Game> {

  constructor(injector: Injector) {
    super(Game, 'games', injector);
  }

  public findByMessageContainingIgnoreCase(text: string): Observable<Game[]> {
    const options: any = {params: [{key: 'text', value: text}]};
    return this.search('findByMessageContainingIgnoreCase', options);
  }
}
