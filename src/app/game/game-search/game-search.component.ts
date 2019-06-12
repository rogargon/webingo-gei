import {Component, Input, EventEmitter, Output} from '@angular/core';
import {Game} from "../game";
import {GameAdminService} from "../game-admin.service";

@Component({
  selector: 'app-game-search',
  templateUrl: './game-search.component.html'
})

export class GameSearchComponent {
  @Input() gamesList: Game[];
  @Output() emitResults: EventEmitter<any> = new EventEmitter();

  constructor(private gameService: GameAdminService) {
  }

  performSearch(text: string): void {
    this.gameService.findGameByNameContaining(text)
      .subscribe(
        (games) => {
          this.emitResults.emit(games.sort((a, b) => a.name.localeCompare(b.name)));
        });
  }
}
