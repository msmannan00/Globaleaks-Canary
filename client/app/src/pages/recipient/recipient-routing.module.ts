import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import { PreferenceResolver } from 'app/src/shared/resolvers/preference.resolver';
import { TipsComponent } from './tips/tips.component';
import { SettingsComponent } from './settings/settings.component';
// import { TipComponent } from './tip/tip.component';
import {PreferencesComponent} from "../../shared/partials/preferences/preferences.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'reports',
    component: TipsComponent,
    pathMatch: 'full',
  },
  {
    path: 'settings',
    component: SettingsComponent,
    pathMatch: 'full',
  },
  {
    path: 'preferences',
    component: PreferencesComponent,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipientRoutingModule {}
