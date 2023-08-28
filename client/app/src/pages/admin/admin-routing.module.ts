import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { SettingsModule } from './settings/settings.module';
import { UsersModule } from './users/users.module';
import { ContextsModule } from './contexts/contexts.module';

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
  {
    path: 'contexts',
    loadChildren: () => ContextsModule,
    pathMatch: 'full',
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
