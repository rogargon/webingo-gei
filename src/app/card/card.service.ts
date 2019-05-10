import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {RestService} from 'angular4-hal-aot';
import {Card} from './card';


@Injectable()
export class CardService extends RestService<Card> {

  constructor(injector: Injector) {
    super(Card, 'cards', injector);
  }
}

