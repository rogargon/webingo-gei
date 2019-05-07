import {Resource} from 'angular4-hal-aot';

export class Card extends Resource {
  id: string;
  numbers: number[][];
}
