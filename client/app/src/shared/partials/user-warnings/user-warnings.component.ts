import {Component} from "@angular/core";
import {AuthenticationService} from "app/src/services/authentication.service";
import {PreferenceResolver} from "../../resolvers/preference.resolver";
import {NodeResolver} from "../../resolvers/node.resolver";

@Component({
  selector: "src-user-warnings",
  templateUrl: "./user-warnings.component.html"
})
export class UserWarningsComponent {

  constructor(protected authentication: AuthenticationService, protected preferenceResolver: PreferenceResolver, protected nodeResolver: NodeResolver) {
  }
}
