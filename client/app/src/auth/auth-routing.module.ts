import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {PasswordResetComponent} from "./password-reset/password-reset.component";
import {PasswordreqestedComponent} from "./passwordreqested/passwordreqested.component";
import {PasswordResetResponseComponent} from "./password-reset-response/password-reset-response.component";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
  },
  {
    path: 'passwordreset',
    component: PasswordResetComponent,
    pathMatch: 'full',
  },
  {
    path: 'passwordreset/requested',
    component: PasswordreqestedComponent,
    pathMatch: 'full',
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
