import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CaseManagementComponent} from "./case-management.component";
import {SharedModule} from "@app/shared.module";
import {NgbModule, NgbNavModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {CaseManagementRoutingModule} from "./case-management-routing.module";
import {CaseManagementTab1Component} from "./casemanagement-tab1/case-management-tab1.component";
import {SubStatusManagerComponent} from "./substatusmanager/sub-status-manager.component";
import {SubStatusComponent} from "./substatuses/sub-status.component";


@NgModule({
  declarations: [
    CaseManagementComponent,
    CaseManagementTab1Component,
    SubStatusManagerComponent,
    SubStatusComponent,
  ],
  imports: [
    CommonModule,
    CaseManagementRoutingModule, SharedModule, NgbNavModule, NgbModule, RouterModule, FormsModule, NgSelectModule
  ]
})
export class CaseManagementModule {
}