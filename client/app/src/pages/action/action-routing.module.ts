import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: "forcedtwofactor",
    loadComponent: () => import('@app/pages/action/forced-two-factor/forced-two-factor.component').then(m => m.ForcedTwoFactorComponent),
    pathMatch: "full",
    data: {pageTitle: "Password reset"},
  }, {
    path: "forcedpasswordchange",
    loadComponent: () => import('@app/pages/action/force-password-change/force-password-change.component').then(m => m.ForcePasswordChangeComponent),
    pathMatch: "full",
    data: {pageTitle: "Password reset"},
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActionRoutingModule {
}