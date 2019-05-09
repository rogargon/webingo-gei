import { Injectable, Injector } from '@angular/core';
import { RestService } from 'angular4-hal-aot';
import { Card } from './card';
import {Observable} from 'rxjs';

@Injectable()
export class CardService extends RestService<Card> {

  constructor(injector: Injector) {
    super(Card, 'cards', injector);
  }
  public findById(id: number): Observable<Card[]> {
    const options: any = {params: [{key: 'id', value: id}]};
    return this.search('findById', options);
  }
}
