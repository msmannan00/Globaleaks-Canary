import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminHomeComponent } from "./home/admin-home.component";
import { SettingsModule } from './settings/settings.module';
import { UsersModule } from './users/users.module';
import { ContextsModule } from './contexts/contexts.module';
import { CaseManagementModule } from "./casemanagement/case-management.module";
import { AuditLogModule } from './auditlog/audit-log.module';
import { NotificationsModule } from './notifications/notifications.module';
import { SitesModule } from "./sites/sites.module";
import { NetworkModule } from './network/network.module';
import { QuestionnairesModule } from './questionnaires/questionnaires.module';
import {AdminPreferencesComponent} from "./admin-preferences/admin-preferences.component";
import {NodeResolver} from "../../shared/resolvers/node.resolver";
import {PreferenceResolver} from "../../shared/resolvers/preference.resolver";
import {UsersResolver} from "../../shared/resolvers/users.resolver";
import {QuestionnairesResolver} from "../../shared/resolvers/questionnaires.resolver";
import {ContextsResolver} from "../../shared/resolvers/contexts.resolver";
import {AuditlogResolver} from "../../shared/resolvers/auditlog.resolver";
import {JobResolver} from "../../shared/resolvers/job.resolver";
import {TipsResolver} from "../../shared/resolvers/tips.resolver";
import {NotificationsResolver} from "../../shared/resolvers/notifications.resolver";
import {NetworkResolver} from "../../shared/resolvers/network.resolver";
import {RedirectsResolver} from "../../shared/resolvers/redirects.resolver";
import {FieldtemplatesResolver} from "../../shared/resolvers/fieldtemplates.resolver";
import {StatuseResolver} from "../../shared/resolvers/statuses.resolver";

const routes: Routes = [
  {
    path: '',
    component: adminHomeComponent,
    resolve: {
      NodeResolver,PreferenceResolver,UsersResolver
    },
    pathMatch: 'full',
    data: { sidebar: 'admin-sidebar', pageTitle: 'Home'},
  },
  {
    path: 'home',
    component: adminHomeComponent,
    resolve: {
      NodeResolver,PreferenceResolver,UsersResolver
    },
    pathMatch: 'full',
    data: { sidebar: 'admin-sidebar' , pageTitle: 'Home'}
  },
  {
    path: 'preferences',
    component: AdminPreferencesComponent,
    resolve: {
      NodeResolver,PreferenceResolver
    },
    pathMatch: 'full',
    data: { pageTitle: 'Preferences'}
  },
  {
    path: 'settings',
    resolve: {
      NodeResolver,PreferenceResolver,UsersResolver,QuestionnairesResolver
    },
    loadChildren: () => SettingsModule,
    pathMatch: 'full',
  },
  {
    path: 'sites',
    resolve: {
      NodeResolver,PreferenceResolver,UsersResolver, JobResolver, TipsResolver,StatuseResolver
    },
    loadChildren: () => SitesModule,
    pathMatch: 'full',
  },
  {
    path: 'users',
    loadChildren: () => UsersModule,
    resolve: {
      NodeResolver,PreferenceResolver,UsersResolver
    },
    pathMatch: 'full',
  },
  {
    path: 'questionnaires',
    resolve: {
      NodeResolver,PreferenceResolver,UsersResolver,QuestionnairesResolver, RedirectsResolver,FieldtemplatesResolver
    },
    loadChildren: () => QuestionnairesModule,
    pathMatch: 'full',
  },
  {
    path: 'contexts',
    loadChildren: () => ContextsModule,
    resolve: {
      NodeResolver,PreferenceResolver,UsersResolver,QuestionnairesResolver, ContextsResolver
    },
    pathMatch: 'full',
  },
  {
    path: 'casemanagement',
    loadChildren: () => CaseManagementModule,
    resolve: {
      NodeResolver,PreferenceResolver ,StatuseResolver
    },
    pathMatch: 'full',
  },
  {
    path: 'auditlog',
    resolve: {
      NodeResolver,PreferenceResolver,UsersResolver, AuditlogResolver, JobResolver, TipsResolver
    },
    loadChildren: () => AuditLogModule,
    pathMatch: 'full',
  },
  {
    path: 'notifications',
    resolve: {
      NodeResolver,PreferenceResolver, NotificationsResolver
    },
    loadChildren: () => NotificationsModule,
    pathMatch: 'full',
  },
  {
    path: 'network',
    resolve: {
      NodeResolver,PreferenceResolver,UsersResolver, NetworkResolver,RedirectsResolver
    },
    loadChildren: () => NetworkModule,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
