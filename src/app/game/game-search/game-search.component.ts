import {Component, Input, EventEmitter, Output} from '@angular/core';
import {User} from '../../login-basic/user';
import {GameService} from "../game.service";

@Component({
  selector: 'app-game-search',
  templateUrl: './game-search.component.html'
})

export class GameSearchComponent {
  @Input() games: User[];
  @Output() emitResults: EventEmitter<any> = new EventEmitter();

  constructor(private gameService: GameService) {
  }

  performSearch(text: string): void {
    this.gameService.findGameByName(text)
      .subscribe(
        (games) => {
          this.emitResults.emit(games);
        });
  }
}
