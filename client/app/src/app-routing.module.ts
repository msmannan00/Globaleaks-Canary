import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth/auth-routing.module';
import {AppComponent} from "./app.component";
import {AdminRoutingModule} from "./admin/admin-routing.module";
import {RouterModule, Routes} from "@angular/router";
import {AppGuard} from "./app.guard";
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => AuthRoutingModule,
  },
  {
    path: 'admin',
    canActivate: [AppGuard],
    loadChildren: () => AdminRoutingModule,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule{

}
