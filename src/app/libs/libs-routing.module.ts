import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QrCodeComponent } from './qr-code/qr-code.component';
import {ShowdownComponent} from "./showdown/showdown.component";
import {InternationalizationComponent} from "./internationalization/internationalization.component";
import {FastshaComponent} from "./fastshah/fastsha.component";

const routes: Routes = [
  {
    path: 'i18a',
    component: InternationalizationComponent,
    pathMatch: 'full',
  },
  {
    path: 'qr-code',
    component: QrCodeComponent,
    pathMatch: 'full',
  },
  {
    path: 'fashshah',
    component: FastshaComponent,
    pathMatch: 'full',
  },
  {
    path: 'showdown',
    component: ShowdownComponent,
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibsRoutingModule {}
