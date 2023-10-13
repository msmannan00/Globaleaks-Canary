import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {ContextsRoutingModule} from "./contexts-routing.module";
import {ContextsComponent} from "./contexts.component";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {NgbNavModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgSelectModule} from "@ng-select/ng-select";
import {SharedModule} from "app/src/shared.module";
import {ContextEditorComponent} from "./context-editor/context-editor.component";


@NgModule({
  declarations: [
    ContextsComponent,
    ContextEditorComponent
  ],
  imports: [
    CommonModule,
    ContextsRoutingModule, SharedModule, NgbNavModule, NgbModule, RouterModule, FormsModule, NgSelectModule
  ]
})
export class ContextsModule {
}
