import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadComponent: () => import('@app/pages/auth/login/login.component').then(m => m.LoginComponent),
    pathMatch: "full",
    data: {pageTitle: "Log in"},
  },
  {
    path: "passwordreset",
    loadComponent: () => import('@app/pages/auth/password-reset/password-reset.component').then(m => m.PasswordResetComponent),
    pathMatch: "full",
    data: {pageTitle: "Password reset"},
  },
  {
    path: "passwordreset/requested",
    loadComponent: () => import('@app/pages/auth/passwordreqested/password-requested.component').then(m => m.PasswordRequestedComponent),
    pathMatch: "full",
    data: {pageTitle: "Password reset"},
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
