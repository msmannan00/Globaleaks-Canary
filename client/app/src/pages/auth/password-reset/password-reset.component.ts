import {Component} from "@angular/core";
import {AppDataService} from "@app/app-data.service";
import {AppConfigService} from "@app/services/app-config.service";
import {AuthenticationService} from "@app/services/authentication.service";
import {UtilsService} from "@app/shared/services/utils.service";

@Component({
  selector: "src-password-reset",
  templateUrl: "./password-reset.component.html"
})
export class PasswordResetComponent {
  username: any = undefined;

  constructor(private authenticationService: AuthenticationService, protected utilsService: UtilsService, protected appDataService: AppDataService) {
  }

  submitRequest() {
    if (this.username !== undefined) {
      this.authenticationService.resetPassword(this.username);
    }
  }
}
