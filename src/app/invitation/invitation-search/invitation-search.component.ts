import { Component, Input, EventEmitter, Output } from '@angular/core';
import { InvitationService } from '../invitation.service';
import { User } from '../../login-basic/user';
import { forkJoin } from 'rxjs';
import {Invitation} from '../invitation';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-invitation-search',
  templateUrl: './invitation-search.component.html'
})

export class InvitationSearchComponent {
  @Input() invitations: Invitation[];
  @Output() emitResults: EventEmitter<any> = new EventEmitter();

  constructor(private route: ActivatedRoute,
              private invitationService: InvitationService,
              private router: Router) {
  }
  performSearch(text: string): void {
      this.invitationService.findByMessageContaining(text)
    .subscribe(
      (invitations) => {
        this.emitResults.emit(invitations);
      });
  }
}
