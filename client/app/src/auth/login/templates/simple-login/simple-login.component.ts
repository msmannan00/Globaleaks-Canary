import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AppConfigService} from "../../../../app-config.service";
import {AuthenticationService} from "../../../../services/authentication.service";
import {LoginDataRef} from "../../model/login-model";

@Component({
  selector: 'app-simple-login',
  templateUrl: './simple-login.component.html',
  styleUrls: ['./simple-login.component.css']
})
export class SimpleLoginComponent {

  @Input() loginData: LoginDataRef;
  @Input() loginFormValid: boolean;
  constructor(public appConfig: AppConfigService, public authentication: AuthenticationService) {
  }
}
