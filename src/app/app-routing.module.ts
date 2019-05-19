import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from './login-basic/loggedin.guard';
import { AdministratorGuard } from './login-basic/administrator.guard';
import { AboutComponent } from './about/about.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { PlayerListComponent } from './user/user-list/player-list.component';
import { PlayerDetailComponent } from './user/user-detail/player-detail.component';
import { AdminDetailComponent } from './user/user-detail/admin-detail.component';
import { PlayerDeleteComponent } from './user/user-delete/player-delete.component';
import { AdminDeleteComponent } from './user/user-delete/admin-delete.component';
import { PlayerEditComponent } from './user/user-edit/player-edit.component';
import { AdminEditComponent } from './user/user-edit/admin-edit.component';
import { PlayerCreateComponent } from './user/user-create/player-create.component';
import { AdminCreateComponent } from './user/user-create/admin-create.component';
import { InvitationListComponent } from './invitation/invitation-list/invitation-list.component';
import { GameListComponent } from './game/game-list/game-list.component';
import { CardListComponent } from './card/card-list/card-list.component';
import { InvitationCreateComponent } from './invitation/invitation-create/invitation-create.component';
import { InvitationDetailComponent } from './invitation/invitation-detail/invitation-detail.component';
import { InvitationEditComponent } from './invitation/invitation-edit/invitation-edit.component';
import { InvitationDeleteComponent } from './invitation/invitation-delete/invitation-delete.component';
import { CardListComponent } from './card/card-list/card-list.component';
import { CardDetailComponent } from './card/card-detail/card-detail.component';
import { CardDeleteComponent } from './card/card-delete/card-delete.component';
import { NotFoundComponent } from './error-handler/error-alert/not-found.component';
import { GameCreateComponent } from "./game/game-create/game-create.component";
import { GameDetailComponent } from "./game/game-detail/game-detail.component";
import { GameEditComponent } from "./game/game-edit/game-edit.component";


const routes: Routes = [
  { path: 'players/new', component: PlayerCreateComponent, canActivate: [AdministratorGuard] },
  { path: 'players/:id/edit', component: PlayerEditComponent, canActivate: [LoggedInGuard] },
  { path: 'players/:id/delete', component: PlayerDeleteComponent, canActivate: [LoggedInGuard] },
  { path: 'players/:id', component: PlayerDetailComponent, canActivate: [LoggedInGuard] },
  { path: 'admins/new', component: AdminCreateComponent, canActivate: [AdministratorGuard] },
  { path: 'admins/:id/edit', component: AdminEditComponent, canActivate: [AdministratorGuard] },
  { path: 'admins/:id/delete', component: AdminDeleteComponent, canActivate: [AdministratorGuard] },
  { path: 'admins/:id', component: AdminDetailComponent, canActivate: [AdministratorGuard] },
  { path: 'players', component: PlayerListComponent, canActivate: [LoggedInGuard] },
  { path: 'users', component: UserListComponent, canActivate: [LoggedInGuard] },
  { path: 'invitations', component: InvitationListComponent, canActivate: [LoggedInGuard] },
  { path: 'invitations/new', component: InvitationCreateComponent, canActivate: [LoggedInGuard] },
  { path: 'invitations/:id', component: InvitationDetailComponent, canActivate: [LoggedInGuard] },
  { path: 'invitations/:id/edit', component: InvitationEditComponent, canActivate: [LoggedInGuard] },
  { path: 'invitations/:id/delete', component: InvitationDeleteComponent, canActivate: [LoggedInGuard] },
  { path: 'games', component: GameListComponent, canActivate: [AdministratorGuard] },
  { path: 'games/new', component: GameCreateComponent, canActivate: [AdministratorGuard] },
  { path: 'games/:id', component: GameDetailComponent, canActivate: [LoggedInGuard] },
  { path: 'games/:id/edit', component: GameEditComponent, canActivate: [AdministratorGuard] },
  { path: 'cards', component: CardListComponent, canActivate: [LoggedInGuard] },
  { path: 'cards/:id', component: CardDetailComponent, canActivate: [LoggedInGuard] },
  { path: 'cards/:id/delete', component: CardDeleteComponent, canActivate: [LoggedInGuard] },
  { path: 'about', component: AboutComponent },
  { path: '404', component: NotFoundComponent},
  { path: '', redirectTo: 'about', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
