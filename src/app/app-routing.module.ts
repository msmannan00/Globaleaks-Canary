import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {LibsRoutingModule} from "./libs/libs-routing.module";

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    pathMatch: 'full',
  }, {
    path: 'lib',
    loadChildren: () => LibsRoutingModule
  }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
