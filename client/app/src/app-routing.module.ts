import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth/auth-routing.module';
import {AppComponent} from "./app.component";
import {AdminRoutingModule} from "./admin/admin-routing.module";
import {RouterModule, Routes} from "@angular/router";
import {AppGuard} from "./app.guard";
import { HomeComponent } from './dashboard/home/home.component';
import {PasswordResetResponseComponent} from "./auth/password-reset-response/password-reset-response.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => AuthRoutingModule,
  },
  {
    path: 'admin',
    canActivate: [AppGuard],
    loadChildren: () => AdminRoutingModule,
  },
  {
    path: 'password/reset',
    component: PasswordResetResponseComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule{

}
