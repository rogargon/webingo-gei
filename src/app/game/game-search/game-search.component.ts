import {Component, Input, EventEmitter, Output} from '@angular/core';
import {User} from '../../login-basic/user';
import {GameService} from "../game.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-game-search',
  templateUrl: './game-search.component.html'
})

export class GameSearchComponent {
  @Input() games: User[];
  @Output() emitResults: EventEmitter<any> = new EventEmitter();

  constructor(private gameService: GameService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  performSearch(text: string): void {
    this.gameService.findByMessageContainingIgnoreCase(text)
      .subscribe(
        (games) => {
          this.emitResults.emit(games);
        });
  }
}
