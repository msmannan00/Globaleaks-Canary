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
  },
  {
    path: "home",
    component: HomeComponent,
    pathMatch: "full",
  },
  {
    path: "reports",
    component: TipsComponent,
    pathMatch: "full",
  },
  {
    path: "settings",
    component: SettingsComponent,
    pathMatch: "full",
  },
  {
    path: "preferences",
    component: PreferencesComponent,
    pathMatch: "full",
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipientRoutingModule {
}
