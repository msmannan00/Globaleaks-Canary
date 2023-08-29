import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CasemanagementComponent} from "./casemanagement.component";

const routes: Routes = [
  {
    path: '',
    component: CasemanagementComponent,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CasemanagementRoutingModule { }
