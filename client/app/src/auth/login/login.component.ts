import {Component} from '@angular/core';
import {AppConfigService} from "../../app-config.service";
import {AuthenticationService} from "../../services/authentication.service";
import {LoginDataRef} from "./model/login-model";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  loginData = new LoginDataRef();
  loginForm: any;

  public isFormValid() : boolean{
    return this.loginForm.valid;
  }

  constructor(public appConfig: AppConfigService, public authentication: AuthenticationService) {
    this.loginData.loginUsername = "wqdwdq";
  }
}
