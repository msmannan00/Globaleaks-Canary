import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {AuthRoutingModule} from "./auth/auth-routing.module";

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    pathMatch: 'full',
  }, {
    path: 'login',
    loadChildren: () => AuthRoutingModule
  }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
