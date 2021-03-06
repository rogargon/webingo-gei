import {Resource} from 'angular4-hal-aot';

export class Game extends Resource {

  id: string;
  name: string;
  uri: string;
  pricePerCard: number;
  status: string;
  jackpot: number;
  createdAt: string;
  line: Boolean;
  bingo: Boolean;
}
