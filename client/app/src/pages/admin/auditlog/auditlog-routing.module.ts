import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuditlogComponent} from "./auditlog.component";

const routes: Routes = [
  {
    path: '',
    component: AuditlogComponent,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuditLogRoutingModule { }
