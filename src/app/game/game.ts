import {Resource} from 'angular4-hal-aot';

export class Game extends Resource {

  id: string;
  name: string;
  uri: string;
  pricePerCard: Number;
  status: string;
  jackpot: Number;
  createdAt: string;
}
