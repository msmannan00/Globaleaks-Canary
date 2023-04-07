import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './pages/auth/auth-routing.module';
import {AdminRoutingModule} from "./pages/admin/admin-routing.module";
import {RouterModule, Routes} from "@angular/router";
import {SessionGuard} from "./app-guard.service";
import { HomeComponent } from './pages/dashboard/home/home.component';
import {PasswordResetResponseComponent} from "./pages/auth/password-reset-response/password-reset-response.component";
import {RecipientRoutingModule} from "./pages/recipient/recipient-routing.module";
import {PreferenceResolver} from "./shared/resolvers/preference.resolver";
import {ForcedTwoFactorComponent} from "./pages/action/forced-two-factor/forced-two-factor.component";
import {ActionRoutingModule} from "./pages/action/action-routing.module";


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
    path: 'action',
    loadChildren: () => ActionRoutingModule,
  },
  {
    path: 'recipient',
    canActivate: [SessionGuard],
    resolve: {
       PreferenceResolver
    },
    loadChildren: () => RecipientRoutingModule,
  },
  {
    path: 'admin',
    canActivate: [SessionGuard],
    resolve: {
      PreferenceResolver
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
