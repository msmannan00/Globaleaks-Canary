import {Component, OnInit} from "@angular/core";
import {new_context} from "app/src/models/admin/new_context";
import {AuthenticationService} from "app/src/services/authentication.service";
import {ContextsResolver} from "app/src/shared/resolvers/contexts.resolver";
import {NodeResolver} from "app/src/shared/resolvers/node.resolver";
import {PreferenceResolver} from "app/src/shared/resolvers/preference.resolver";
import {UsersResolver} from "app/src/shared/resolvers/users.resolver";
import {HttpService} from "app/src/shared/services/http.service";
import {UtilsService} from "app/src/shared/services/utils.service";

@Component({
  selector: "src-contexts",
  templateUrl: "./contexts.component.html"
})
export class ContextsComponent implements OnInit {
  showAddContext: boolean = false;
  new_context: any = {};
  contextsData: any = [];


  constructor(public preference: PreferenceResolver, public httpService: HttpService, public authenticationService: AuthenticationService, public node: NodeResolver, public users: UsersResolver, public contexts: ContextsResolver, public utilsService: UtilsService) {
  }

  toggleAddContext() {
    this.showAddContext = !this.showAddContext;
  };

  ngOnInit(): void {
    if (this.contexts.dataModel) {
      this.contextsData = this.contexts.dataModel;
    }
  }

  add_context() {
    var context: new_context = new new_context();
    context.name = this.new_context.name;
    context.questionnaire_id = this.node.dataModel.default_questionnaire;
    context.order = this.newItemOrder(this.contextsData, "order");
    this.utilsService.addAdminContext(context).subscribe(res => {
      this.contextsData.push(res);
      this.new_context = {};
    });
  }

  handleDataFromChild() {
    this.utilsService.reloadCurrentRoute();
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