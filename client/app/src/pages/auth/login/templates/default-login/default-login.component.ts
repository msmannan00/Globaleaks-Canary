import {Component, Input} from '@angular/core';
import {AppConfigService} from "../../../../../services/app-config.service";
import {AuthenticationService} from "../../../../../services/authentication.service";
import {LoginDataRef} from "../../model/login-model";
import {UtilsService} from "../../../../../shared/services/utils.service";
import {ControlContainer, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";

@Component({
  selector: 'app-default-login',
  templateUrl: './default-login.component.html',
  styleUrls: ['./default-login.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class DefaultLoginComponent {

  @Input() loginData: LoginDataRef;
  @Input() loginValidator: NgForm;
  loginAuthCode: any;
  
  ngOnInit() { 
    
  }


  constructor(public utils: UtilsService, public appConfig: AppConfigService, public authentication: AuthenticationService) {
  }
}
