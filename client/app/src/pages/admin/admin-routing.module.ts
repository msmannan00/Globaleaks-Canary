import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import { SettingsModule } from './settings/settings.module';
import { UsersComponent } from './users/users.component';
import { TenantsResolver } from 'app/src/shared/resolvers/tenants.resolver';
// import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'settings',
    loadChildren: () => SettingsModule,
    pathMatch: 'full',
  },
  {
    path: 'users',
    // resolve: {
    //   TenantsResolver
    // },
    component: UsersComponent,
    pathMatch: 'full',
  },
  // {
  //   path: 'settings',
  //   component: SettingsComponent,
  //   pathMatch: 'full',
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
