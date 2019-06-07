import {User} from '../login-basic/user';
import {Card} from '../card/card';

export class Player extends User {
  played: Card[] = [];
  card: Card;

}
