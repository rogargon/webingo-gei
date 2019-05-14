import { Component, OnInit } from '@angular/core';
import {forkJoin} from 'rxjs';
import {Card} from '../card';
import { CardService } from '../card.service';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';
import {PlayerService} from '../../user/player.service';
import {logger} from 'codelyzer/util/logger';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
})
export class CardListComponent implements OnInit {
  public cards: Card[] = [];
  public totalCards = 0;
  public asd: string;

  constructor(
    private cardService: CardService, private authenticationService: AuthenticationBasicService, private playerService: PlayerService) {
  }

  ngOnInit() {
      if (!this.authenticationService.isAdmin()) {
        this.playerService.findByUsernameContaining(this.authenticationService.getCurrentUser().username)
          .subscribe(player => this.cards = [player[0].card]);
        this.totalCards = this.cards.length;
      } else {
        this.cardService.getAll().subscribe(cards => this.cards = cards);
        this.totalCards = this.cards.length;
      }

  }

  showSearchResults(cards) {
    this.cards = cards;
  }

}
