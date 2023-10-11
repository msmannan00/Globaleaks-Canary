import { Component, Input } from '@angular/core';
import { AppConfigService } from '../../../../../services/app-config.service';
import { AuthenticationService } from '../../../../../services/authentication.service';
import { LoginDataRef } from '../../model/login-model';
import {NgForm} from "@angular/forms";
import {UtilsService} from "../../../../../shared/services/utils.service";
import {AppDataService} from "../../../../../app-data.service";

@Component({
  selector: 'app-simple-login',
  templateUrl: './simple-login.component.html',
})
export class SimpleLoginComponent {

  @Input() loginData: LoginDataRef;
  @Input() loginValidator: NgForm;

  constructor(public utils: UtilsService, public appConfig: AppConfigService, public authentication: AuthenticationService, public appDataService:AppDataService) {
  }

 }
