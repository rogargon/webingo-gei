import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbCollapseModule, NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AngularHalModule } from 'angular4-hal-aot';
import { ExternalConfigurationService } from './external-configuration-service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppRoutingModule } from './app-routing.module';
import { ErrorHandlerModule } from './error-handler/error-handler.module';
import { HttpErrorInterceptor } from './error-handler/http-error-interceptor';
import { LoginBasicModule } from './login-basic/login-basic.module';
import { LoggedInGuard } from './login-basic/loggedin.guard';
import { AdministratorGuard } from './login-basic/administrator.guard';
import { AuthInterceptor } from './login-basic/auth-interceptor';

import { AuthenticationBasicService } from './login-basic/authentication-basic.service';
import { PlayerService } from './user/player.service';
import { AdminService } from './user/admin.service';
import { InvitationService } from './invitation/invitation.service';
import { CardService } from './card/card.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { PlayerListComponent } from './user/user-list/player-list.component';
import { PlayerDetailComponent } from './user/user-detail/player-detail.component';
import { PlayerRegisterComponent } from './user/user-register/player-register.component';
import { AdminDetailComponent } from './user/user-detail/admin-detail.component';
import { PlayerDeleteComponent } from './user/user-delete/player-delete.component';
import { AdminDeleteComponent } from './user/user-delete/admin-delete.component';
import { PlayerCreateComponent } from './user/user-create/player-create.component';
import { AdminCreateComponent } from './user/user-create/admin-create.component';
import { PlayerEditComponent } from './user/user-edit/player-edit.component';
import { AdminEditComponent } from './user/user-edit/admin-edit.component';
import { UserSearchComponent } from './user/user-search/user-search.component';
import { InvitationListComponent } from './invitation/invitation-list/invitation-list.component';
import { GameListComponent } from './game/game-list/game-list.component';
import { CardListComponent } from './card/card-list/card-list.component';
import { CardDetailComponent } from './card/card-detail/card-detail.component';
import { CardDeleteComponent } from './card/card-delete/card-delete.component';
import { CardSearchComponent } from './card/card-search/card-search.component';
import { InvitationCreateComponent } from './invitation/invitation-create/invitation-create.component';
import { InvitationDetailComponent } from './invitation/invitation-detail/invitation-detail.component';
import { InvitationDeleteComponent } from './invitation/invitation-delete/invitation-delete.component';
import { InvitationSearchComponent } from './invitation/invitation-search/invitation-search.component';
import { InvitationEditComponent } from './invitation/invitation-edit/invitation-edit.component';
import { GameService } from "./game/game.service";
import { GameSearchComponent } from "./game/game-search/game-search.component";
import { GameCreateComponent } from "./game/game-create/game-create.component";
import { GameDetailComponent } from "./game/game-detail/game-detail.component";
import { GameAdminService } from "./game/game-admin.service";
import { GameEditComponent } from "./game/game-edit/game-edit.component";
import { NotFoundComponent } from './error-handler/error-alert/not-found.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    UserListComponent,
    PlayerListComponent,
    PlayerDetailComponent,
    AdminDetailComponent,
    PlayerDeleteComponent,
    PlayerRegisterComponent,
    AdminDeleteComponent,
    PlayerCreateComponent,
    AdminCreateComponent,
    PlayerEditComponent,
    AdminEditComponent,
    UserSearchComponent,
    GameCreateComponent,
    GameListComponent,
    GameDetailComponent,
    GameSearchComponent,
    GameEditComponent,
    CardListComponent,
    CardDetailComponent,
    CardDeleteComponent,
    CardSearchComponent,
    InvitationListComponent,
    InvitationEditComponent,
    InvitationSearchComponent,
    InvitationCreateComponent,
    InvitationDetailComponent,
    InvitationDeleteComponent,
    NotFoundComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbCollapseModule,
    NgbDropdownModule,
    NgbPaginationModule,
    AngularHalModule.forRoot(),
    LoginBasicModule,
    ErrorHandlerModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: 'ExternalConfigurationService', useClass: ExternalConfigurationService },

    AuthenticationBasicService, LoggedInGuard, AdministratorGuard, AdminService, PlayerService,
    GameService, GameAdminService, CardService, InvitationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
