import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SettingsRoutingModule} from "@app/pages/admin/settings/settings-routing.module";
import {SettingsComponent} from "@app/pages/admin/settings/settings.component";
import {RouterModule} from "@angular/router";
import {NgbNavModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SharedModule} from "@app/shared.module";
import {Tab1Component} from "@app/pages/admin/settings/tab1/tab1.component";
import {Tab2Component} from "@app/pages/admin/settings/tab2/tab2.component";
import {Tab3Component} from "@app/pages/admin/settings/tab3/tab3.component";
import {Tab4Component} from "@app/pages/admin/settings/tab4/tab4.component";
import {Tab5Component} from "@app/pages/admin/settings/tab5/tab5.component";
import {FormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";

@NgModule({
  declarations: [
    SettingsComponent,
    Tab1Component,
    Tab2Component,
    Tab3Component,
    Tab4Component,
    Tab5Component
  ],
  exports: [
    Tab1Component
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule, SharedModule, NgbNavModule, NgbModule, RouterModule, FormsModule, NgSelectModule
  ]
})
export class SettingsModule {
}