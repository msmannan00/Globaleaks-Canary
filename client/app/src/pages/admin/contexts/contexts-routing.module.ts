import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContextsComponent } from './contexts.component';

const routes: Routes = [
  {
    path: '',
    component: ContextsComponent,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContextsRoutingModule { }
