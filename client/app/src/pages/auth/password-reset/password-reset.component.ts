import {Component} from "@angular/core";
import {AppDataService} from "@app/app-data.service";
import {AuthenticationService} from "@app/services/helper/authentication.service";
import {UtilsService} from "@app/shared/services/utils.service";
import { NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { TranslatorPipe } from "@app/shared/pipes/translate";

@Component({
    selector: "src-password-reset",
    templateUrl: "./password-reset.component.html",
    standalone: true,
    imports: [NgIf, FormsModule, TranslateModule, TranslatorPipe]
})
export class PasswordResetComponent {
  username: string | undefined = undefined;

  constructor(private authenticationService: AuthenticationService, protected utilsService: UtilsService, protected appDataService: AppDataService) {
  }

  submitRequest() {
    if (this.username !== undefined) {
      this.authenticationService.resetPassword(this.username);
    }
  }
}
