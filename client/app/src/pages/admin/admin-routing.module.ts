import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { SettingsModule } from './settings/settings.module';
import { UsersModule } from './users/users.module';
import { ContextsModule } from './contexts/contexts.module';
import { CasemanagementModule } from "./casemanagement/casemanagement.module";
import { AuditlogModule } from './auditlog/auditlog.module';
import { NotificationsModule } from './notifications/notifications.module';
import { SitesModule } from "./sites/sites.module";
import { NetworkModule } from './network/network.module';

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
    path: 'sites',
    loadChildren: () => SitesModule,
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
  {
    path: 'casemanagement',
    loadChildren: () => CasemanagementModule,
    pathMatch: 'full',
  },
  {
    path: 'auditlog',
    loadChildren: () => AuditlogModule,
    pathMatch: 'full',
  },
  {
    path: 'notifications',
    loadChildren: () => NotificationsModule,
    pathMatch: 'full',
  },
  {
    path: 'network',
    loadChildren: () => NetworkModule,
    pathMatch: 'full',
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
