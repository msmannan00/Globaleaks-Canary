import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InternationalizationComponent} from "./internationalization/internationalization.component";
import {FastshaComponent} from "./fastshah/fastsha.component";

const routes: Routes = [
  {
    path: 'i18a',
    component: InternationalizationComponent,
    pathMatch: 'full',
  },
  {
    path: 'fashshah',
    component: FastshaComponent,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibsRoutingModule {}
