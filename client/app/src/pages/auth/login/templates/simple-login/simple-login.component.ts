import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppConfigService } from '../../../../../services/app-config.service';
import { AuthenticationService } from '../../../../../services/authentication.service';
import { LoginDataRef } from '../../model/login-model';
import {FormControl, NgForm, Validators} from "@angular/forms";
import {UtilsService} from "../../../../../shared/services/utils.service";
import {AppDataService} from "../../../../../app-data.service";

@Component({
  selector: 'app-simple-login',
  templateUrl: './simple-login.component.html',
  styleUrls: ['./simple-login.component.css'],
})
export class SimpleLoginComponent {

  @Input() loginData: LoginDataRef;
  @Input() loginValidator: NgForm;

  ngOnInit() { 
    // this.initForm()
   }

  // initForm() {
  //   this.loginValidator.addControl("username", new FormControl('', Validators.required));
  //   this.loginValidator.addControl("password", new FormControl('', Validators.required));
  //   this.loginData.loginUsername = this.appDataService.public.receivers[0].id
  // }

  constructor(public utils: UtilsService, public appConfig: AppConfigService, public authentication: AuthenticationService, public appDataService:AppDataService) {
  }

 }
