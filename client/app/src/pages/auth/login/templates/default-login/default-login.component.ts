import {Component, Input} from "@angular/core";
import {AuthenticationService} from "@app/services/helper/authentication.service";
import {LoginDataRef} from "@app/pages/auth/login/model/login-model";
import {UtilsService} from "@app/shared/services/utils.service";
import { ControlContainer, NgForm, FormsModule } from "@angular/forms";
import {AppDataService} from "@app/app-data.service";
import { NgIf } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { TranslatorPipe } from "@app/shared/pipes/translate";

@Component({
    selector: "app-default-login",
    templateUrl: "./default-login.component.html",
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
    standalone: true,
    imports: [
        NgIf,
        FormsModule,
        TranslateModule,
        TranslatorPipe,
    ],
})
export class DefaultLoginComponent {

  @Input() loginData: LoginDataRef;
  @Input() loginValidator: NgForm;

  constructor(protected utils: UtilsService, protected authentication: AuthenticationService, protected appDataService: AppDataService) {
  }
}
