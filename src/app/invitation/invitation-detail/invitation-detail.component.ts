import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvitationService } from '../invitation.service';
import { Invitation } from '../invitation';
import { Player } from '../../user/player';

@Component({
  selector: 'app-invitation-detail',
  templateUrl: './invitation-detail.component.html',
  styleUrls: ['./invitation-detail.component.css']
})
export class InvitationDetailComponent implements OnInit {
  public invitation: Invitation = new Invitation();
  createdBy: any;

  constructor(private route: ActivatedRoute,
              private invitationService: InvitationService,
              private router: Router) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.invitationService.get(id).subscribe(
      invitation => {
        this.invitation = invitation;

        invitation.getRelation(Player, 'createdBy').subscribe(
          createdBy => {
          this.createdBy = createdBy;
        });
      });
  }

  public delete() {
    this.invitationService.delete(this.invitation).subscribe(
      () => this.router.navigate(['users']));
  }
}
