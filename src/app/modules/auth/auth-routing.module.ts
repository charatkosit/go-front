import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from 'src/app/components/content/content.component';
import { ChangepwdComponent } from './components/changepwd/changepwd.component';
import { ForgotpwdComponent } from './components/forgotpwd/forgotpwd.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  // {path: "" ,pathMatch:"full",  redirectTo: "login"},
  { path: "login", component: LoginComponent },
  { path: "forgot", component: ForgotpwdComponent },
  { path: "register", component: RegisterComponent },
  { path: "content", component: ContentComponent },
  { path: "profile", component: ProfileComponent },
  { path: "changepwd", component: ChangepwdComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
