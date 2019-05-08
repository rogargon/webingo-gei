import { Component, OnInit } from '@angular/core';
import {forkJoin} from 'rxjs';
import {Card} from '../card';
import { CardService } from '../card.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
})
export class CardListComponent implements OnInit {
  public cards: Card[] = [];
  public totalCards = 0;

  constructor(
    private cardService: CardService) {
  }

  ngOnInit() {
      this.cardService.getAll().subscribe(cards => this.cards = cards);
      this.totalCards = this.cards.length;
  }

  showSearchResults(cards) {
    this.cards = cards;
  }

}
