import {Component, OnInit} from '@angular/core';
import { Constants } from 'app/src/shared/constants/constants';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../../../services/authentication.service";
import {HttpService} from "../../../shared/services/http.service";
import {AppDataService} from "../../../app-data.service";
import {TranslationService} from "../../../services/translation.service";
import {UtilsService} from "../../../shared/services/utils.service";
import {AppConfigService} from "../../../services/app-config.service";

@Component({
  selector: 'src-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit{
  step: number = 1;
  emailRegexp = Constants.email_regexp;
  password_score = 0
  admin_check_password = ""
  recipient_check_password = "";
  tosAccept: any;
  license = ""
  completed = false;
  validation: any = {step2:false,step3:false,step4:false,step5:false,step6:false};
  wizard = {
    "node_language": "en",
    "node_name": "",
    "admin_username": "",
    "admin_name": "",
    "admin_mail_address": "",
    "admin_password": "",
    "admin_escrow": true,
    "receiver_username": "",
    "receiver_name": "",
    "receiver_mail_address": "",
    "receiver_password": "",
    "skip_admin_account_creation": false,
    "skip_recipient_account_creation": false,
    "profile": "default",
    "enable_developers_exception_notification": false
  };

  config_profiles = [
    {
      name:  "default",
      title: "Default",
      active: true
    }
  ];

  selectProfile(name:any) {
    let self = this
    this.config_profiles.forEach(function(profile:any){
      profile.active = profile.name === name;
      if (profile.active) {
        self.wizard.profile = profile.name;
      }
    });
  };

  complete() {
    if (this.completed) {
      return;
    }
    this.completed = true;

    const param=JSON.stringify(this.wizard);
    this.httpService.requestWizard(param).subscribe
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

  goToAdminInterface(){
    const promise = () => {
      this.appConfigService.loadAdminRoute('/admin/home')
    };
    this.authenticationService.login(0, this.wizard.admin_username, this.wizard.admin_password, "", "",promise)
  }

  loadLicense(){
    this.http.get('license.txt', { responseType: 'text' }).subscribe((data: string) => {
      this.license = data;
    });
  }

  ngOnInit(){
    if (this.appDataService.public.node.wizard_done) {
      this.router.navigate(['/']).then(r => {});
      return;
    }
    this.loadLicense();
    this.wizard.node_language = this.translationService.language
  }

  constructor(public appConfigService: AppConfigService, private utilsService: UtilsService, private translationService: TranslationService, private router: Router, private http: HttpClient, private authenticationService: AuthenticationService, public appDataService: AppDataService , public httpService: HttpService )
  {
  }

  onPasswordStrengthChange(score: number) {
    this.password_score = score
  }

}