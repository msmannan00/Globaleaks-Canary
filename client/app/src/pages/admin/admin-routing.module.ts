import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminHomeComponent } from "./home/admin-home.component";
import { SettingsModule } from './settings/settings.module';
import { UsersModule } from './users/users.module';
import { ContextsModule } from './contexts/contexts.module';
import { CasemanagementModule } from "./casemanagement/casemanagement.module";
import { AuditlogModule } from './auditlog/auditlog.module';
import { NotificationsModule } from './notifications/notifications.module';
import { SitesModule } from "./sites/sites.module";
import { NetworkModule } from './network/network.module';
import { QuestionnairesModule } from './questionnaires/questionnaires.module';
import {AdminPreferencesComponent} from "./admin-preferences/admin-preferences.component";

const routes: Routes = [
  {
    path: '',
    component: adminHomeComponent,
    pathMatch: 'full',
    data: { sidebar: 'admin-sidebar', pageTitle: 'Home'}
  },
  {
    path: 'home',
    component: adminHomeComponent,
    pathMatch: 'full',
    data: { sidebar: 'admin-sidebar' , pageTitle: 'Home'}
  },
  {
    path: 'preferences',
    component: AdminPreferencesComponent,
    pathMatch: 'full',
    data: { pageTitle: 'Preferences'}
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
    path: 'questionnaires',
    loadChildren: () => QuestionnairesModule,
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
