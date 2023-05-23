import {Component} from '@angular/core';
import {AppConfigService} from "../../../services/app-config.service";
import {AuthenticationService} from "../../../services/authentication.service";
import {LoginDataRef} from "./model/login-model";
import {ActivatedRoute, Router, RouterStateSnapshot} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AppDataService} from "../../../app-data.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  loginData = new LoginDataRef();

  ngOnInit() {
   
    this.route.queryParams.subscribe(params => {
      if("token" in params){
        let token = params['token'];
        this.authentication.login(0, "", "", "", token);
      }
    });
  };

  constructor(public appConfig: AppConfigService, public authentication: AuthenticationService, private router: Router,private route: ActivatedRoute, private builder: FormBuilder, public appDataService:AppDataService) {

    if(this.authentication.session !== undefined && this.authentication.session.homepage){
      this.router.navigateByUrl(this.authentication.session.homepage).then(response => {})
    }
  }
}
