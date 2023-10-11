import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PreferencesComponent} from "../../shared/partials/preferences/preferences.component";
import {HomeComponent} from "./home/home.component";
import {SettingsComponent} from "./settings/settings.component";
import {IdentityAccessRequestsComponent} from "./identity-access-requests/identity-access-requests.component";

const routes: Routes = [
  {
    path: 'preferences',
    component: PreferencesComponent,
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'settings',
    component: SettingsComponent,
    pathMatch: 'full',
  },
  {
    path: 'requests',
    component: IdentityAccessRequestsComponent,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustodianRoutingModule {}
