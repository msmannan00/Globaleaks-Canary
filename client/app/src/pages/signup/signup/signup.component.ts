import {Component, OnInit} from "@angular/core";
import {AppDataService} from "@app/app-data.service";
import {HttpService} from "@app/shared/services/http.service";
import {AppConfigService} from "@app/services/root/app-config.service";
import {Signup} from "@app/models/component-model/signup";
import { NgIf, NgSwitch, NgSwitchCase } from "@angular/common";
import { SignupdefaultComponent } from "../templates/signupdefault/signupdefault.component";
import { WbpaComponent } from "../templates/wbpa/wbpa.component";
import { TranslateModule } from "@ngx-translate/core";
import { TranslatorPipe } from "@app/shared/pipes/translate";

@Component({
    selector: "src-signup",
    templateUrl: "./signup.component.html",
    standalone: true,
    imports: [NgIf, NgSwitch, NgSwitchCase, SignupdefaultComponent, WbpaComponent, TranslateModule, TranslatorPipe]
})
export class SignupComponent implements OnInit {
  hostname = "";
  completed = false;
  step = 1;
  signup: Signup = {
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

  constructor(protected appDataService: AppDataService, private httpService: HttpService, private appConfig: AppConfigService) {
  }

  ngOnInit() {
    this.appConfig.routeChangeListener();
  }

  updateSubdomain() {
    this.signup.subdomain = "";
    if (this.signup.organization_name) {
      this.signup.subdomain = this.signup.organization_name.replace(/[^\w]/gi, "").toLowerCase();
    }
  }

  complete() {
    const param = JSON.stringify(this.signup);
    this.httpService.requestSignup(param).subscribe
    (
      {
        next: _ => {
          this.step += 1;
        }
      }
    );
  }
}
