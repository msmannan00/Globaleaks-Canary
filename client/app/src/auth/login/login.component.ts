import {Component} from '@angular/core';
import {AppConfigService} from "../../app-config.service";
import {AuthenticationService} from "../../services/authentication.service";
import {LoginDataRef} from "./model/login-model";
import {AuthRoutingModule} from "../auth-routing.module";
import {Router} from "@angular/router";


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

  constructor(public appConfig: AppConfigService, public authentication: AuthenticationService, private router: Router) {

    if(this.authentication.session !== undefined && this.authentication.session.homepage){
      this.router.navigateByUrl(this.authentication.session.homepage).then(response => {})
    }
  }
}
