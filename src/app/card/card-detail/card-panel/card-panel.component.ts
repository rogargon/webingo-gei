import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../../card';

@Component({
  selector: 'app-card-panel',
  templateUrl: './card-panel.component.html',
  styleUrls: ['./card-panel.component.css']
})
export class CardPanelComponent implements OnInit {
  @Input() card: Card;

  constructor() {
  }

  ngOnInit() {
    console.log('Card :' + this.card);
  }

}
