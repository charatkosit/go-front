import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import { ForgotpwdComponent } from './modules/auth/components/forgotpwd/forgotpwd.component';
import { LoginComponent } from './modules/auth/components/login/login.component';

const routes: Routes = [
  {path: "" ,pathMatch:"full",  redirectTo: "login"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
