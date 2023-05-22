import { Component } from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";
import {PreferenceResolver} from "../../resolvers/preference.resolver";
import {UtilsService} from "../../services/utils.service";
import {AppDataService} from "../../../app-data.service";
import {HttpService} from "../../services/http.service";
import {Router} from "@angular/router";
import {errorCodes} from "../../../models/app/error-code";

@Component({
  selector: 'src-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent {
    passwordStrengthScore: number=0;

    changePasswordArgs = {
        current: "",
        password: "",
        confirm: ""
    };

    changePassword(){
        let data = {
            "operation": "change_password",
            "args": this.changePasswordArgs
        }
        let requestObservable = this.httpService.requestOperations(data);
        requestObservable.subscribe(
            {
                next: response => {
                    this.preferencesService.dataModel.password_change_needed = false
                    this.router.navigate([this.authenticationService.session.homepage]).then(r => {});
                },
                error: (error: any) => {
                    this.passwordStrengthScore = 0
                    this.rootDataService.errorCodes = new errorCodes(error.error.error_message, error.error.error_code, error.error.arguments);
                    this.appDataService.showLoadingPanel = false
                    return this.passwordStrengthScore
                }
            }
        );

    }

    ngOnInit() {
    };

    onPasswordStrengthChange(score:number){
      console.log("xx : " + score)
      this.passwordStrengthScore = score
    }

    public constructor(public rootDataService:AppDataService, private authenticationService:AuthenticationService, private router:Router, public httpService: HttpService, public appDataService:AppDataService, public authentication: AuthenticationService, public preferencesService:PreferenceResolver, public utilsService:UtilsService) {

    }

}
