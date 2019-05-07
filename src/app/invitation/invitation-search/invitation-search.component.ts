import { Component, Input, EventEmitter, Output } from '@angular/core';
import { InvitationService } from '../invitation.service';
import { User } from '../../login-basic/user';
import { forkJoin } from 'rxjs';

/*@Component({
  selector: 'app-invitation-search',
  templateUrl: './invitation-search.component.html'
})

export class InvitationSearchComponent {
  @Input() invitations: Invitation[];
  @Output() emitResults: EventEmitter<any> = new EventEmitter();

  constructor(private playerService: PlayerService,
              private adminService: AdminService) {
  }

  performSearch(text: string): void {
    forkJoin(
      this.playerService.findByUsernameContaining(text),
      this.adminService.findByUsernameContaining(text))
    .subscribe(
      ([players, admins]) => {
        this.emitResults.emit(players.concat(admins).sort((a, b) => a.username.localeCompare(b.username)));
      });
  }
}
*/
