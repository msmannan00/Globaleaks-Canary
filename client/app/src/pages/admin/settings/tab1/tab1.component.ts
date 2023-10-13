import {Component, Input} from "@angular/core";
import {NgForm} from "@angular/forms";
import {NodeResolver} from "@app/shared/resolvers/node.resolver";
import {UtilsService} from "@app/shared/services/utils.service";
import {AuthenticationService} from "@app/services/authentication.service";
import {AppConfigService} from "@app/services/app-config.service";

@Component({
  selector: "src-tab1",
  templateUrl: "./tab1.component.html"
})
export class Tab1Component {
  @Input() contentForm: NgForm;

  constructor(private appConfigService: AppConfigService, protected nodeResolver: NodeResolver, protected authenticationService: AuthenticationService, private utilsService: UtilsService) {
  }

  updateNode() {
    this.utilsService.update(this.nodeResolver.dataModel).subscribe(_ => {
      this.appConfigService.reinit(false);
      this.utilsService.reloadCurrentRoute();
    });
  }
}