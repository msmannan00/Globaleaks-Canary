import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CasemanagementComponent } from './casemanagement.component';
import {SharedModule} from "../../../shared.module";
import {NgbModule, NgbNavModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {CasemanagementRoutingModule} from "./casemanagement-routing.module";
import { CasemanagementTab1Component } from './casemanagement-tab1/casemanagement-tab1.component';
import { SubstatusmanagerComponent } from './substatusmanager/substatusmanager.component';
import { SubstatusesComponent } from './substatuses/substatuses.component';



@NgModule({
  declarations: [
    CasemanagementComponent,
    CasemanagementTab1Component,
    SubstatusmanagerComponent,
    SubstatusesComponent,
  ],
  imports: [
    CommonModule,
    CasemanagementRoutingModule, SharedModule,NgbNavModule,NgbModule,RouterModule,FormsModule,NgSelectModule
  ]
})
export class CasemanagementModule { }
