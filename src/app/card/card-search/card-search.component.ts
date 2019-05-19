import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CardService } from '../card.service';
import { Card } from '../card';
import {PlayerService} from '../../user/player.service';

@Component({
  selector: 'app-card-search',
  templateUrl: './card-search.component.html'
})

export class CardSearchComponent {
  @Input()
  cards: Card[];
  @Output()
  emitResults: EventEmitter<Card[]> = new EventEmitter();

  constructor(private cardService: CardService, private playerService: PlayerService) {
  }

  performSearch(searchTerm: string): void {
    this.cardService.getAll().subscribe(
      cards => {
        let result: Card[];
        result = [];
        for (let i = 0, len = this.cards.length; i < len; i++) {
          if (this.cards[i].player != null && this.cards[i].player.username.includes(searchTerm)) {
            result.push(this.cards[i]);
          }
        }
        this.emitResults.emit(result);
      });
  }
}

