import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { ForgotpwdComponent } from './components/forgotpwd/forgotpwd.component';
import { RegisterComponent } from './components/register/register.component';
import { ChangepwdComponent } from './components/changepwd/changepwd.component';
import { ProfileComponent } from './components/profile/profile.component';


@NgModule({
  declarations: [
    LoginComponent,
    ForgotpwdComponent,
    RegisterComponent,
    ChangepwdComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
  ],
  exports:[
    LoginComponent,
    RegisterComponent,
    ForgotpwdComponent
  ]
})
export class AuthModule { }
