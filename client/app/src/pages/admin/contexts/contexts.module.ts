import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ContextsRoutingModule} from "@app/pages/admin/contexts/contexts-routing.module";
import {ContextsComponent} from "@app/pages/admin/contexts/contexts.component";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {NgbNavModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgSelectModule} from "@ng-select/ng-select";

import {ContextEditorComponent} from "@app/pages/admin/contexts/context-editor/context-editor.component";


@NgModule({
    imports: [
    CommonModule,
    ContextsRoutingModule, NgbNavModule, NgbModule, RouterModule, FormsModule, NgSelectModule,
    ContextsComponent,
    ContextEditorComponent
]
})
export class ContextsModule {
}
