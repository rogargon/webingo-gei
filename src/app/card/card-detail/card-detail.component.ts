import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from '../card.service';
import { Card } from '../card';
import Swal from "sweetalert2";

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
    Swal.fire(
      'Deleted!',
      'The card ' + this.card.id + ' has been deleted',
      'success'
    );
  }
}
