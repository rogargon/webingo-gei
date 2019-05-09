import { Component, Input, EventEmitter, Output } from '@angular/core';
import { CardService } from '../card.service';
import { Card } from '../card';

@Component({
  selector: 'app-card-search',
  templateUrl: './card-search.component.html'
})

export class CardSearchComponent {
  @Input()
  cards: Card[];
  @Output()
  emitResults: EventEmitter<Card[]> = new EventEmitter();

  constructor(private cardService: CardService) {
  }

  performSearch(searchTerm: number): void {
    this.cardService.findById(searchTerm).subscribe(
      cards => { this.emitResults.emit(cards); });
  }
}

