import {Resource} from 'angular4-hal-aot';

export class Game extends Resource {

  id: string;
  name: string;
  uri: string;
  pricePerCard: number;
  status: string;
  jackpot: number;
  createdAt: string;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}
