import {Routes} from '@angular/router';

import {LoginFormComponent} from './login-form.component';
import {PlayerRegisterComponent} from '../user/user-register/player-register.component';


export const routes: Routes = [
  {path: 'login', component: LoginFormComponent},
  {path: 'register', component: PlayerRegisterComponent},

];
