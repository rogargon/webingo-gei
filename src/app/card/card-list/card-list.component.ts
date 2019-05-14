import { Component, OnInit } from '@angular/core';
import {forkJoin} from 'rxjs';
import {Card} from '../card';
import { CardService } from '../card.service';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';
import {PlayerService} from '../../user/player.service';
import {logger} from 'codelyzer/util/logger';
import { Sort } from 'angular4-hal-aot';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
})
export class CardListComponent implements OnInit {
  public cards: Card[] = [];
  public totalCards = 0;
  public pageSize = 10;
  public page = 1;
  private sorting: Sort[] = [{ path: 'id', order: 'ASC' }];
  constructor(
    private cardService: CardService, private authenticationService: AuthenticationBasicService, private playerService: PlayerService) {
  }

  ngOnInit() {
      if (!this.authenticationService.isAdmin()) {
        this.playerService.findByUsernameContaining(this.authenticationService.getCurrentUser().username)
          .subscribe(player => this.cards = [player[0].card]);
        this.totalCards = this.cardService.totalElement();
      } else {
        this.cardService.getAll({size: this.pageSize, sort: this.sorting})
          .subscribe((cards) => {
            this.cards = cards;
            this.totalCards = this.cardService.totalElement();
          });
      }
  }

  changePage() {
    this.cardService.page(this.page - 1).subscribe(
      (cards: Card[]) => this.cards = cards);
  }

  showSearchResults(cards) {
    this.cards = cards;
  }

}
