import {Component, Input} from "@angular/core";
import {AuthenticationService} from "@app/services/authentication.service";
import {LoginDataRef} from "../../model/login-model";
import {NgForm} from "@angular/forms";
import {AppDataService} from "@app/app-data.service";

@Component({
  selector: "app-simple-login",
  templateUrl: "./simple-login.component.html",
})
export class SimpleLoginComponent {

  @Input() loginData: LoginDataRef;
  @Input() loginValidator: NgForm;

  constructor(public authentication: AuthenticationService, public appDataService: AppDataService) {
  }

}
