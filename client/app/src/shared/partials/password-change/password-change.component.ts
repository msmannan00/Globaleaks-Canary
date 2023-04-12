import { Component } from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";
import {PreferenceResolver} from "../../resolvers/preference.resolver";
import {UtilsService} from "../../services/utils.service";
import {AppDataService} from "../../../app-data.service";
import {Observable} from "rxjs";
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
    strengthText = ""
    strengthType = ""

    changePasswordArgs = {
        current: "",
        password: "",
        confirm: ""
    };
    passwordStrengthValidator(password:string){

        let types = [
            /[a-z]/.test(password),
            /[A-Z]/.test(password),
            /\W/.test(password),
            /\d/.test(password)
        ];

        let i,
            variation1 = 0,
            variation2 = 0,
            letters = new Map(),
            score = 0;

        if (password.length!=0) {
            /* Score symbols variation */

            for (i in types) {
                if(types[i]){
                    variation1+=1
                }
            }

            /* Score unique symbols */
            for (i = 0; i < password.length; i++) {
                if (password.length>i && !letters.get(password.at(i))) {
                    letters.set(password.at(i), 1);
                    variation2 += 1;
                }
            }

            if (variation1 !== 4 || variation2 < 10 || password.length < 12) {
                score = 1;
            } else if (variation1 !== 4 || variation2 < 12 || password.length < 14) {
                score = 2;
            } else {
                score = 3;
            }
        }

        if(password.length == 0){
            this.strengthType = "";
            this.strengthText = "";
            this.passwordStrengthScore = 0
            return this.passwordStrengthScore
        }
        else if (score < 2) {
            this.strengthType = "bg-danger";
            this.strengthText = "Weak";
        } else if (score < 3) {
            this.strengthType = "bg-warning";
            this.strengthText = "Acceptable";
        } else {
            this.strengthType = "bg-primary";
            this.strengthText = "Strong";
        }

        this.passwordStrengthScore = score
        return score > 1;
    }

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
                    this.strengthType = "";
                    this.strengthText = "";
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

    public constructor(public rootDataService:AppDataService, private authenticationService:AuthenticationService, private router:Router, public httpService: HttpService, public appDataService:AppDataService, public authentication: AuthenticationService, public preferencesService:PreferenceResolver, public utilsService:UtilsService) {

    }

}
