import {Component, Input} from '@angular/core';
import {AppConfigService} from "../../../../app-config.service";
import {AuthenticationService} from "../../../../services/authentication.service";
import {LoginDataRef} from "../../model/login-model";
import {UtilsService} from "../../../../services/utils.service";

@Component({
  selector: 'app-default-login',
  templateUrl: './default-login.component.html',
  styleUrls: ['./default-login.component.css']
})
export class DefaultLoginComponent {

  @Input() loginData: LoginDataRef;
  @Input() loginFormValid: boolean;

  constructor(public utils: UtilsService, public appConfig: AppConfigService, public authentication: AuthenticationService) {
  }
}
