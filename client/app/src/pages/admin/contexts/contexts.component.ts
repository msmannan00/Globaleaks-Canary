import {Component, OnInit} from "@angular/core";
import {NewContext} from "@app/models/admin/new-context";
import {contextResolverModel} from "@app/models/resolvers/context-resolver-model";
import {AuthenticationService} from "@app/services/helper/authentication.service";
import {ContextsResolver} from "@app/shared/resolvers/contexts.resolver";
import {NodeResolver} from "@app/shared/resolvers/node.resolver";
import {PreferenceResolver} from "@app/shared/resolvers/preference.resolver";
import {UsersResolver} from "@app/shared/resolvers/users.resolver";
import {HttpService} from "@app/shared/services/http.service";
import {UtilsService} from "@app/shared/services/utils.service";
import { NgIf, NgClass, NgFor } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ContextEditorComponent } from "@app/pages/admin/contexts/context-editor/context-editor.component";
import { TranslatorPipe } from "@app/shared/pipes/translate";

@Component({
    selector: "src-contexts",
    templateUrl: "./contexts.component.html",
    standalone: true,
    imports: [NgIf, FormsModule, NgClass, NgFor, ContextEditorComponent, TranslatorPipe]
})
export class ContextsComponent implements OnInit {
  showAddContext: boolean = false;
  new_context: { name: string; } = {name: ""};
  contextsData: contextResolverModel[] = [];


  constructor(protected preference: PreferenceResolver, protected httpService: HttpService, protected authenticationService: AuthenticationService, protected node: NodeResolver, protected users: UsersResolver, protected contexts: ContextsResolver, protected utilsService: UtilsService) {
  }

  toggleAddContext() {
    this.showAddContext = !this.showAddContext;
  };

  ngOnInit(): void {
    if (Array.isArray(this.contexts.dataModel)) {
      this.contextsData = this.contexts.dataModel;
    } else {
      this.contextsData = [this.contexts.dataModel];
    }
  }

  addContext() {
    const context: NewContext = new NewContext();
    context.name = this.new_context.name;
    context.questionnaire_id = "default";
    context.order = this.newItemOrder(this.contextsData, "order");
    this.utilsService.addAdminContext(context).subscribe(res => {
      this.contextsData.push(res);
      this.new_context.name = "";
    });
  }

  newItemOrder(objects: any[], key: string): number {
    if (objects.length === 0) {
      return 0;
    }

    let max = 0;
    for (const object of objects) {
      if (object[key] > max) {
        max = object[key];
      }
    }

    return max + 1;
  }
}