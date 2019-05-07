import { Injectable, Injector } from '@angular/core';
import { RestService } from 'angular4-hal-aot';
import { Card } from './card';
import {Observable} from 'rxjs';

@Injectable()
export class CardService extends RestService<Card> {

  constructor(injector: Injector) {
    super(Card, 'cards', injector);
  }
  public findById(text: string): Observable<Card[]> {
    const options: any = {params: [{key: 'text', value: text}]};
    return this.search('findById', options);
  }
}
