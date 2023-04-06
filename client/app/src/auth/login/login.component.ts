import {Component} from '@angular/core';
import {AppConfigService} from "../../services/app-config.service";
import {AuthenticationService} from "../../services/authentication.service";
import {LoginDataRef} from "./model/login-model";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AppDataService} from "../../app-data.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  loginData = new LoginDataRef();
  loginValidator: FormGroup;

  ngOnInit() {
    this.loginValidator = this.builder.group({
    })
  };

  constructor(public appConfig: AppConfigService, public authentication: AuthenticationService, private router: Router, private builder: FormBuilder, public appDataService:AppDataService) {

    if(this.authentication.session !== undefined && this.authentication.session.homepage){
      this.router.navigateByUrl(this.authentication.session.homepage).then(response => {})
    }
  }
}
