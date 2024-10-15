import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SessionGuard} from "@app/app-guard.service";
import {AdminGuard} from "@app/shared/guards/admin.guard";
import {CustodianGuard} from "@app/shared/guards/custodian.guard";
import {ReceiverGuard} from "@app/shared/guards/receiver.guard";
import {AnalystGuard} from "@app/shared/guards/analyst.guard";
import {PreferenceResolver} from "@app/shared/resolvers/preference.resolver";
import {Pageguard} from "@app/shared/guards/pageguard.service";
import {NodeResolver} from "@app/shared/resolvers/node.resolver";
import {RTipsResolver} from "@app/shared/resolvers/r-tips-resolver.service";
import {TitleResolver} from "@app/shared/resolvers/title-resolver.resolver";
import {IarResolver} from "@app/shared/resolvers/iar-resolver.service";
import {WbTipResolver} from "@app/shared/resolvers/wb-tip-resolver.service";
import {WhistleblowerLoginResolver} from "@app/shared/resolvers/whistleblower-login.resolver";
import {AuthRoutingModule} from "@app/pages/auth/auth-routing.module";


const routes: Routes = [
  {
    path: "blank",
    pathMatch: "full",
    loadComponent: () => import('@app/shared/blank/blank.component').then(m => m.BlankComponent)
  },
  {
    path: "",
    canActivate: [Pageguard],
    loadComponent: () => import('@app/pages/dashboard/home/home.component').then(m => m.HomeComponent),
    data: {pageTitle: ""},
    pathMatch: "full",
    resolve: {
      WbTipResolver, WhistleblowerLoginResolver
    }
  },
  {
    path: "submission",
    canActivate: [Pageguard],
    loadComponent: () => import('@app/pages/whistleblower/submission/submission.component').then(m => m.SubmissionComponent),
    data: {pageTitle: ""},
    pathMatch: "full",
    resolve: {
      WbTipResolver, WhistleblowerLoginResolver
    }
  },
  {
    path: "login",
    canActivate: [Pageguard],
    data: {pageTitle: "Log in"},
    loadChildren: () => AuthRoutingModule,
  },
  {
    path: "signup",
    data: {pageTitle: "Sign up"},
    resolve: {
      PreferenceResolver
    },
    loadChildren: () => import("./pages/signup/signup-routing.module").then(m => m.SignupRoutingModule)

  },
  {
    path: "action",
    loadChildren: () => import("./pages/action/action-routing.module").then(m => m.ActionRoutingModule)
  },
  {
    path: "recipient",
    canActivate: [ReceiverGuard],
    loadChildren: () => import("./pages/recipient/recipient-routing.module").then(m => m.RecipientRoutingModule),
    data: {
      sidebar: "recipient-sidebar"
    }
  },
  {
    path: "custodian",
    canActivate: [CustodianGuard],
    resolve: {
      PreferenceResolver, NodeResolver, RtipsResolver: RTipsResolver, IarsResolver: IarResolver
    },
    loadChildren: () => import("./pages/custodian/custodian-routing.module").then(m => m.CustodianRoutingModule),
    data: {
      sidebar: "custodian-sidebar",
      pageTitle: "Home",
    },
  },
  {
    path: "analyst",
    canActivate: [AnalystGuard],
    loadChildren: () => import("./pages/analyst/analyst-routing.module").then(m => m.AnalystRoutingModule),
    data: {
      sidebar: "analyst-sidebar",
      pageTitle: "Home",
    },
  },
  {
    path: "admin",
    canActivate: [AdminGuard],
    loadChildren: () => import("./pages/admin/admin-routing.module").then(m => m.AdminRoutingModule),
    data: {
      sidebar: "admin-sidebar",
      pageTitle: "Log in",
    },
  },
  {
    path: "password/reset",
    data: {pageTitle: "Password reset"},
    loadComponent: () => import('@app/pages/auth/password-reset-response/password-reset-response.component').then(m => m.PasswordResetResponseComponent),
  },
  {
    path: "activation",
    data: {pageTitle: "Sign up"},
    loadComponent: () => import('@app/pages/signup/templates/activation/activation.component').then(m => m.ActivationComponent),
  },
  {
    path: "wizard",
    data: {pageTitle: "Platform wizard"},
    resolve: {
      PreferenceResolver,
      title: TitleResolver
    },
    loadChildren: () => import("./pages/wizard/wizard-routing.module").then(m => m.WizardRoutingModule)
  },
  {
    path: "reports/:tip_id",
    data: {pageTitle: "Report"},
    resolve: {
      PreferenceResolver,
    },
    loadComponent: () => import('@app/pages/recipient/tip/tip.component').then(m => m.TipComponent),
    canActivate: [SessionGuard],
    pathMatch: "full",
  },
  {path: "**", redirectTo: ""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
