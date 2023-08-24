import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import { SettingsModule } from './settings/settings.module';
import { UsersModule } from './users/users.module';
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
    loadChildren: () => UsersModule,
    pathMatch: 'full',
  },
  // {
  //   path: 'users',
  //   component: UsersComponent,
  //   pathMatch: 'full',
  // },
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
