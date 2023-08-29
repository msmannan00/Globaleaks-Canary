import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditlogTab1Component } from './auditlog-tab1/auditlog-tab1.component';
import { AuditlogTab2Component } from './auditlog-tab2/auditlog-tab2.component';
import { AuditlogTab3Component } from './auditlog-tab3/auditlog-tab3.component';
import { AuditlogTab4Component } from './auditlog-tab4/auditlog-tab4.component';
import { AuditlogComponent } from './auditlog.component';
import {SharedModule} from "../../../shared.module";
import {NgbModule, NgbNavModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {AuditLogRoutingModule} from "./auditlog-routing.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    AuditlogTab1Component,
    AuditlogTab2Component,
    AuditlogTab3Component,
    AuditlogTab4Component,
    AuditlogComponent
  ],
  imports: [
    CommonModule,
    AuditLogRoutingModule, SharedModule, NgbNavModule, NgbModule, RouterModule, FormsModule, NgSelectModule, TranslateModule
  ]
})
export class AuditlogModule { }
