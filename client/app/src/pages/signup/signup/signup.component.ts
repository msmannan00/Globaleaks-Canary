import { Component } from '@angular/core';
import {AppDataService} from "../../../app-data.service";
import {HttpService} from "../../../shared/services/http.service";
import { AppConfigService } from 'app/src/services/app-config.service';

@Component({
  selector: 'src-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
    hostname = "";

    step = 1;
    signup = {
        "subdomain": "",
        "name": "",
        "surname": "",
        "role": "",
        "email": "",
        "phone": "",
        "organization_name": "",
        "organization_type": "",
        "organization_tax_code": "",
        "organization_vat_code": "",
        "organization_location": "",
        "tos1": false,
        "tos2": false
    };

    completed = false;

    updateSubdomain(){
        this.signup.subdomain = "";
        if (this.signup.organization_name) {
            this.signup.subdomain = this.signup.organization_name.replace(/[^\w]/gi, "").toLowerCase();
        }
    }

    complete(){
        const param=JSON.stringify(this.signup);
        this.httpService.requestSignup(param).subscribe
        (
            {
                next: response => {
                    this.step +=1
                },
                error: (error: any) => {
                }
            }
        );
    }

    constructor(public appDataService:AppDataService, public httpService: HttpService, public appConfig:AppConfigService) {
    }

    ngOnInit(){
        this.appConfig.routeChangeListener();
    }

}
