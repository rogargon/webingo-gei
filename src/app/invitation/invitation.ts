import { Resource } from 'angular4-hal-aot';
import { Player } from '../user/player';
import { Game } from '../game/game';

export class Invitation extends Resource {

  uri: string;
  id: number;
  message: string;
  invites: Player;
  createdBy: Player;
  invitesTo: Game;
  createdAt: Date;

  invitedPlayer: string;

  constructor(values: Object = {}) {
    super();
    Object.assign(this, values);
  }
  setInvitedPlayer(username): void {
    this.invitedPlayer = username;
  }

}
