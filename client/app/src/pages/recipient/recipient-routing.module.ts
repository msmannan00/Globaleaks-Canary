import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "@app/pages/recipient/home/home.component";
import {TipsComponent} from "@app/pages/recipient/tips/tips.component";
import {SettingsComponent} from "@app/pages/recipient/settings/settings.component";
import {PreferencesComponent} from "@app/shared/partials/preferences/preferences.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    pathMatch: "full",
    data: {pageTitle: "Home"},
  },
  {
    path: "home",
    component: HomeComponent,
    pathMatch: "full",
    data: {pageTitle: "Home"},
  },
  {
    path: "reports",
    component: TipsComponent,
    pathMatch: "full",
    data: {pageTitle: "Reports"},
  },
  {
    path: "settings",
    component: SettingsComponent,
    pathMatch: "full",
    data: {pageTitle: "Settings"},
  },
  {
    path: "preferences",
    component: PreferencesComponent,
    pathMatch: "full",
    data: {pageTitle: "Preferences"},
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipientRoutingModule {
}
