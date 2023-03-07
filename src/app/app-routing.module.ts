import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import { AuthGuard } from './guards/auth.guard';
import { ChangepwdComponent } from './modules/auth/components/changepwd/changepwd.component';
import { ForgotpwdComponent } from './modules/auth/components/forgotpwd/forgotpwd.component';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { ProfileComponent } from './modules/auth/components/profile/profile.component';
import { RegisterComponent } from './modules/auth/components/register/register.component';

const routes: Routes = [
  {path: "" ,pathMatch:"full",  redirectTo: "auth"},
  {path: 'sap', loadChildren: () => import('./modules/sap/sap.module').then(m => m.SapModule) },
  {path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  {path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
