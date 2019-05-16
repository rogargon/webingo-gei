import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardService } from '../card.service';
import { Card } from '../card';
import { Player } from '../../user/player';
import { PlayerService } from '../../user/player.service';

@Component({
  selector: 'app-card-create',
  templateUrl: './card-create.component.html',
  styleUrls: ['./card-create.component.css']
})
export class CardCreateComponent implements OnInit {

  public card: Card;
  public players: Player[] = [];

  constructor(private router: Router,
              private cardService: CardService,
              private playerService: PlayerService) {
  }

  ngOnInit() {
    this.card = new Card();
    this.playerService.getAll()
      .subscribe(
        players => {
          this.players = players;
        });
  }

  onSubmit(): void {
    this.cardService.create(this.card).subscribe(
      (card: Card) => this.router.navigate([card.uri]));

  }
}
