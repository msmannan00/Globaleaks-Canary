import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CaseManagementComponent} from "@app/pages/admin/casemanagement/case-management.component";

import {NgbModule, NgbNavModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {CaseManagementRoutingModule} from "@app/pages/admin/casemanagement/case-management-routing.module";
import {
  CaseManagementTab1Component
} from "@app/pages/admin/casemanagement/casemanagement-tab1/case-management-tab1.component";
import {SubStatusManagerComponent} from "@app/pages/admin/casemanagement/substatusmanager/sub-status-manager.component";
import {SubStatusComponent} from "@app/pages/admin/casemanagement/substatuses/sub-status.component";


@NgModule({
    imports: [
    CommonModule,
    CaseManagementRoutingModule, NgbNavModule, NgbModule, RouterModule, FormsModule, NgSelectModule,
    CaseManagementComponent,
    CaseManagementTab1Component,
    SubStatusManagerComponent,
    SubStatusComponent
]
})
export class CaseManagementModule {
}