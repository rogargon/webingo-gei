import { Resource } from 'angular4-hal-aot';

export class Card extends Resource {
  rows: number;
  cols: number;
  uri: string;
  id: number;
  numbers: number[][];
  // game: Game;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}
