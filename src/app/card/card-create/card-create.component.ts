import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardService } from '../card.service';
import { Card } from '../card';

@Component({
  selector: 'app-player-create',
  templateUrl: '../user-form/user-form.component.html'
})
export class CardCreateComponent implements OnInit {
  public card: Card;

  constructor(private router: Router,
              private adminService: CardService) {
  }

  ngOnInit() {
    this.card = new Card();
  }

  onSubmit(): void {
    this.adminService.create(this.card).subscribe(
      (card: Card) => this.router.navigate([card.uri]));
  }
}
