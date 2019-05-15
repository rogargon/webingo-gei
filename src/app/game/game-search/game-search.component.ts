import {Component, Input, EventEmitter, Output} from '@angular/core';
import {GameService} from "../game.service";
import {Game} from "../game";

@Component({
  selector: 'app-game-search',
  templateUrl: './game-search.component.html'
})

export class GameSearchComponent {
  @Input() games: Game[];
  @Output() emitResults: EventEmitter<any> = new EventEmitter();

  constructor(private gameService: GameService) {
  }

  performSearch(text: string): void {
    this.gameService.findGameByName(text)
      .subscribe(
        (games) => {
          this.emitResults.emit(games.sort((a, b) => a.name.localeCompare(b.name)));
        });
  }
}
