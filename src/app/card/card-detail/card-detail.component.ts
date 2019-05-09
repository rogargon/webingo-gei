import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from '../card.service';
import { Card } from '../card';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.css']
})
export class CardDetailComponent implements OnInit {
  public card: Card;

  constructor(private route: ActivatedRoute,
              private cardService: CardService,
              private router: Router) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.cardService.get(id).subscribe(
      card => {this.card = card}, error => {
        this.router.navigate(['404']);
      });
  }

  public delete() {
    this.cardService.delete(this.card).subscribe(
      () => this.router.navigate(['cards']));
  }
}
