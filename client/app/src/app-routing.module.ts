import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth/auth-routing.module';
import {AdminRoutingModule} from "./admin/admin-routing.module";
import {RouterModule, Routes} from "@angular/router";
import {SessionGuard} from "./app-guard.service";
import { HomeComponent } from './dashboard/home/home.component';
import {PasswordResetResponseComponent} from "./auth/password-reset-response/password-reset-response.component";
import {RecipientRoutingModule} from "./recipient/recipient-routing.module";
import {PreferenceResolver} from "./dataResolvers/preference.resolver";
import {RecieverTipResolver} from "./dataResolvers/reciever-tip.resolver";
import {JobsResolver} from "./dataResolvers/jobs.resolver";
import {SubmissionStatusResolver} from "./dataResolvers/submission-status.resolver";
import {QuestionareResolver} from "./dataResolvers/questionare.resolver";
import {AdminAuditLOgResolver} from "./dataResolvers/admin-audit-log.resolver";
import {AdminNodeResolver} from "./dataResolvers/admin-node.resolver";
import {AdminContextResolver} from "./dataResolvers/admin-context.resolver";
import {AdminFieldTemplateResolver} from "./dataResolvers/admin-field-template.resolver";
import {AdminUserResolver} from "./dataResolvers/admin-user.resolver";
import {AdminNetworkResolver} from "./dataResolvers/admin-network.resolver";
import {AdminNotificationResolver} from "./dataResolvers/admin-notification.resolver";
import {AdminRedirectResolver} from "./dataResolvers/admin-redirect.resolver";
import {AdminTenantResolver} from "./dataResolvers/admin-tenant.resolver";
import {TipCollectionResolver} from "./dataResolvers/tip-collection.resolver";
import {AppConfigService} from "./services/app-config.service";
import {AppModule} from "./app.module";

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
    path: 'recipient',
    canActivate: [SessionGuard],
    resolve: {
      preferences: PreferenceResolver
    },
    loadChildren: () => RecipientRoutingModule,
  },
  {
    path: 'admin',
    canActivate: [SessionGuard],
    resolve: {
      preferences: PreferenceResolver
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
