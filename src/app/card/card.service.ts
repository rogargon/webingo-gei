import { Injectable, Injector } from '@angular/core';
import { RestService } from 'angular4-hal-aot';
import { Card } from './card';
import {Observable} from 'rxjs';
import {Game} from '../game/game';

@Injectable()
export class CardService extends RestService<Card> {

  constructor(injector: Injector) {
    super(Card, 'cards', injector);
  }
  public findById(id: number): Observable<Card[]> {
    const options: any = {params: [{key: 'id', value: id}]};
    return this.search('findById', options);
  }

  public findByGame(game: string): Observable<Card[]> {
    const options: any = {params: [{key: 'game', value: game}]};
    return this.search('findByGame', options);
  }
}
