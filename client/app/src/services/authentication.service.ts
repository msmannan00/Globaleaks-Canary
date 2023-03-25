import { Injectable } from '@angular/core';
import {LoginDataRef} from "../auth/login/model/login-model";
import {HttpService} from "./http.service";
import {Observable} from "rxjs";
import {AppConfigService} from "../app-config.service";
import {errorCodes} from "../models/error-code";
import {Root} from "../models/public-model";
import {Session} from "../models/Session";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  loginInProgress:Boolean = false;
  requireAuthCode:Boolean = false;
  loginData:LoginDataRef = new LoginDataRef();
  public session:any = <Session>{};

  public reset() {
    this.loginInProgress = false;
    this.requireAuthCode = false;
    this.loginData = new LoginDataRef();
  };

  deleteSession() {
    this.session = null
    window.sessionStorage.removeItem("session");
  };

  setSession(response:any){
    this.session = response;

    if (this.session.role !== "whistleblower") {
      let role = this.session.role === "receiver" ? "recipient" : this.session.role;

      this.session.homepage = "/" + role + "/home";
      this.session.preferencespage = "/" + role + "/preferences";
      window.sessionStorage.setItem("session",  JSON.stringify(this.session));
    }
  }

  login(tid?:any, username?:any, password?:any, authcode?:any, authtoken?:any){
    if(authtoken === undefined){
      authtoken = "";
    }
    if(authcode === undefined){
      authcode = "";
    }

    this.loginInProgress = true;

    let requestObservable:Observable<any>
    this.appConfigService.showLoadingPanel = true;
    if (authtoken) {
      requestObservable = this.httpService.requestGeneralLogin("");
    } else {
      if (username === "whistleblower") {
        requestObservable = this.httpService.requestGeneralLogin("");
      } else {
        const param=JSON.stringify({"tid":tid,"username":username,"password":password,"authcode":authcode});
        requestObservable = this.httpService.requestGeneralLogin(param);
      }
    }

    requestObservable.subscribe(
      {
        next: response => {
          this.appConfigService.showLoadingPanel = false
          this.reset();
          this.setSession(response)
          location.replace("/");
        },
        error: (error: any) => {
          this.appConfigService.showLoadingPanel = false
          this.loginInProgress = false;
          this.appConfigService.errorCodes = new errorCodes(error.error.error_message, error.error.error_code, error.error.arguments);
        }
      }
    );

  }

  constructor(public httpService: HttpService, public appConfigService: AppConfigService) {
    let json = window.sessionStorage.getItem("session")
    if(json!=null){
      this.session = JSON.parse(json);
    }else {
      this.session = undefined
    }
  }
}
