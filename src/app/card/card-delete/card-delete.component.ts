import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from '../card.service';
import { Card } from '../card';

@Component({
  selector: 'app-card-delete',
  templateUrl: './card-delete.component.html'
})
export class CardDeleteComponent implements OnInit {
  public card: Card = new Card();
  private id: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private cardService: CardService) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.cardService.get(this.id).subscribe(
      card => this.card = card);
  }

  delete() {
    this.cardService.delete(this.card).subscribe(
      () => this.router.navigate(['cards']));
  }
}
