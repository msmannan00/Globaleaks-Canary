import {Component} from "@angular/core";
import {AuthenticationService} from "@app/services/authentication.service";
import {UtilsService} from "@app/shared/services/utils.service";

@Component({
  selector: "src-password-reset",
  templateUrl: "./password-reset.component.html"
})
export class PasswordResetComponent {
  username: any = undefined;

  constructor(private authenticationService: AuthenticationService, protected utilsService: UtilsService) {
  }

  submitRequest() {
    if (this.username !== undefined) {
      this.authenticationService.resetPassword(this.username);
    }
  }
}
