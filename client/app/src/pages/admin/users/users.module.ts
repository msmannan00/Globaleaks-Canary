import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {UsersRoutingModule} from "./users-routing.module";
import {UserEditorComponent} from "./user-editor/user-editor.component";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {NgbNavModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgSelectModule} from "@ng-select/ng-select";
import {SharedModule} from "app/src/shared.module";
import {UsersComponent} from "./users.component";
import {UsersTab1Component} from "./users-tab1/users-tab1.component";
import {UsersTab2Component} from "./users-tab2/users-tab2.component";


@NgModule({
  declarations: [
    UsersComponent,
    UserEditorComponent,
    UsersTab1Component,
    UsersTab2Component
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule, NgbNavModule, NgbModule, RouterModule, FormsModule, NgSelectModule
  ]
})
export class UsersModule {
}