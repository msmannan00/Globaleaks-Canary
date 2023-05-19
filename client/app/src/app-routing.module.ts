import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './pages/auth/auth-routing.module';
import {AdminRoutingModule} from "./pages/admin/admin-routing.module";
import {RouterModule, Routes} from "@angular/router";
import {SessionGuard} from "./app-guard.service";
import { HomeComponent } from './pages/dashboard/home/home.component';
import {PasswordResetResponseComponent} from "./pages/auth/password-reset-response/password-reset-response.component";
import {RecipientRoutingModule} from "./pages/recipient/recipient-routing.module";
import {PreferenceResolver} from "./shared/resolvers/preference.resolver";
import {ActionRoutingModule} from "./pages/action/action-routing.module";
import {SignupRoutingModule} from "./pages/signup/signup-routing.module";
import {Pageguard} from "./shared/guards/pageguard.service";
import {ActivationComponent} from "./pages/signup/templates/activation/activation.component";
import { WizardModule } from './pages/wizard/wizard.module';


const routes: Routes = [
  {
    path: 'routing',
    pathMatch: 'full',
  },
  {
    path: '',
    canActivate: [Pageguard],
    component: HomeComponent,
    resolve: {
    },
    pathMatch: 'full',
  },
  {
    path: 'login',
    resolve: {
      PreferenceResolver
    },
    loadChildren: () => AuthRoutingModule,
  },
  {
    path: 'signup',
    resolve: {
      PreferenceResolver
    },
    loadChildren: () => SignupRoutingModule,
  },
  {
    path: 'action',
    resolve: {
      PreferenceResolver
    },
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
  },
  {
    path: 'activation',
    component: ActivationComponent,
  },
  {
    path: 'wizard',
    resolve: {
      PreferenceResolver
    },
    loadChildren: () => WizardModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule{

}
