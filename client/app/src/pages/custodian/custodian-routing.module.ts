import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PreferencesComponent} from "@app/shared/partials/preferences/preferences.component";
import {HomeComponent} from "@app/pages/custodian/home/home.component";
import {SettingsComponent} from "@app/pages/custodian/settings/settings.component";
import {IdentityAccessRequestsComponent} from "@app/pages/custodian/identity-access-requests/identity-access-requests.component";

const routes: Routes = [
  {
    path: "preferences",
    component: PreferencesComponent,
    pathMatch: "full",
  },
  {
    path: "home",
    component: HomeComponent,
    pathMatch: "full",
  },
  {
    path: "",
    component: HomeComponent,
    pathMatch: "full",
  },
  {
    path: "settings",
    component: SettingsComponent,
    pathMatch: "full",
  },
  {
    path: "requests",
    component: IdentityAccessRequestsComponent,
    pathMatch: "full",
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustodianRoutingModule {
}
