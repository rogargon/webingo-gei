import { Component, Input, EventEmitter, Output } from '@angular/core';
import { InvitationService } from '../invitation.service';
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
      this.invitationService.findByMessageContainingIgnoreCase(text)
    .subscribe(
      (invitations) => {
        this.emitResults.emit(invitations);
      });
  }
}
