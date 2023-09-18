import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication.service";
import {FormGroup} from "@angular/forms";
import {AppConfigService} from "../../../services/app-config.service";
import {AppDataService} from "../../../app-data.service";
import {UtilsService} from "../../../shared/services/utils.service";

@Component({
  selector: 'src-password-reset',
  templateUrl: './password-reset.component.html'
})
export class PasswordResetComponent {
  username:any = undefined

  constructor(private authenticationService:AuthenticationService, public utilsService:UtilsService, public appDataService: AppDataService) {
  }
  submitRequest(){
    if(this.username !== undefined){
      this.authenticationService.resetPassword(this.username)
    }
  }
}
