import {Component, Input, OnInit} from '@angular/core';
import {Card} from '../../card';

@Component({
  selector: 'app-card-panel',
  templateUrl: './card-panel.component.html',
  styleUrls: ['./card-panel.component.css']
})
export class CardPanelComponent implements OnInit {
  @Input() card: Card;
  @Input() click: boolean;

  constructor() {
  }

  ngOnInit() {
    console.log('Card :' + this.card);
  }

  public changeColor(event) {
    if (!this.click) {
      return;
    }
    if (event.srcElement.childNodes[0].length > 0) {
      event.target.classList.add('active');
    }
  }

}
