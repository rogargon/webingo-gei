import { Resource } from 'angular4-hal-aot';
import { PlayerService } from '../user/player.service';
import {Player} from '../user/player';
import {Game} from '../game/game';

export class Card extends Resource {
  rows: number;
  cols: number;
  uri: string;
  id: number;
  numbers: number[][];
  game: Game;
  player: Player;

  constructor(values: object = {}) {
    super();
    Object.assign(this as any, values);
  }
}
