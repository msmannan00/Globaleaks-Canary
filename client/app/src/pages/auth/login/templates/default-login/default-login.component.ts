import {Component, Input} from '@angular/core';
import {AppConfigService} from "../../../../../services/app-config.service";
import {AuthenticationService} from "../../../../../services/authentication.service";
import {LoginDataRef} from "../../model/login-model";
import {UtilsService} from "../../../../../shared/services/utils.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-default-login',
  templateUrl: './default-login.component.html',
  styleUrls: ['./default-login.component.css']
})
export class DefaultLoginComponent {

  @Input() loginData: LoginDataRef;
  @Input() loginValidator: any;

  ngOnInit() { this.initForm() }

  initForm() {
    this.loginValidator.addControl("username", new FormControl('', Validators.required));
    this.loginValidator.addControl("password", new FormControl('', Validators.required));
  }

  constructor(public utils: UtilsService, public appConfig: AppConfigService, public authentication: AuthenticationService) {
  }
}
