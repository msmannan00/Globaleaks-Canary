import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './modules/auth/auth-routing.module';
import {AdminRoutingModule} from "./modules/admin/admin-routing.module";
import {RouterModule, Routes} from "@angular/router";
import {SessionGuard} from "./app-guard.service";
import { HomeComponent } from './modules/dashboard/home/home.component';
import {PasswordResetResponseComponent} from "./modules/auth/password-reset-response/password-reset-response.component";
import {RecipientRoutingModule} from "./modules/recipient/recipient-routing.module";
import {PreferenceResolver} from "./shared/resolvers/preference.resolver";


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      preferences: PreferenceResolver
    },
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => AuthRoutingModule,
  },
  {
    path: 'recipient',
    canActivate: [SessionGuard],
    resolve: {
      preferences: PreferenceResolver
    },
    loadChildren: () => RecipientRoutingModule,
  },
  {
    path: 'admin',
    canActivate: [SessionGuard],
    resolve: {
      preferences: PreferenceResolver
    },
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
