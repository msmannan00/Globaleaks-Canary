import { Injectable } from '@angular/core';
import {LoginDataRef} from "../pages/auth/login/model/login-model";
import {HttpService} from "../shared/services/http.service";
import {Observable} from "rxjs";
import {AppConfigService} from "./app-config.service";
import {Session} from "../models/authentication/Session";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {LocationStrategy} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {AppDataService} from "../app-data.service";
import {errorCodes} from "../models/app/error-code";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  loginInProgress:Boolean = false;
  requireAuthCode:Boolean = false;
  loginData:LoginDataRef = new LoginDataRef();
  public session:any = undefined;

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

  resetPassword(username:string){

    const param=JSON.stringify({"username":username});
    this.httpService.requestResetLogin(param).subscribe
    (
      {
        next: response => {
          this.router.navigate(['/login/passwordreset/requested']).then(r => {});
        },
        error: (error: any) => {
        }
      }
    );
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
    this.rootDataService.showLoadingPanel = true;
    if (authtoken) {
      requestObservable = this.httpService.requestAuthTokenLogin(JSON.stringify({"authtoken":authtoken}));
    } else {
      if (username === "whistleblower") {
        password = password.replace(/\D/g,"");
        requestObservable = this.httpService.requestWhistleBlowerLogin(JSON.stringify({"receipt": password}));
      } else {
        requestObservable = this.httpService.requestGeneralLogin(JSON.stringify({"tid":tid,"username":username,"password":password,"authcode":authcode}));
      }
    }

    requestObservable.subscribe(
      {
        next: response => {
          this.rootDataService.showLoadingPanel = false
          this.reset();
          this.setSession(response)

          if ("redirect" in response) {
            this.router.navigate([response.data.redirect]).then(r => {});
          }

          let src = location.search;
          if (src) {
            location.replace(src);
          } else {
            if (this.session.role === "whistleblower") {
              if (password) {
                this.rootDataService.page="tippage";
                this.router.navigate(['/']).then(r => {});
              }
            } else {
              this.router.navigate([this.session.homepage]).then(r => {});
            }
          }
        },
        error: (error: any) => {
          this.loginInProgress = false;
          this.rootDataService.showLoadingPanel = false
          if (error.error && error.error.error_code) {
            if (error.error.error_code === 4) {
              this.requireAuthCode = true;
            } else if (error.error.error_code !== 13) {
              this.reset();
            }
          }
          this.rootDataService.errorCodes = new errorCodes(error.error.error_message, error.error.error_code, error.error.arguments);
        }
      }
    );
  }

  public getHeader(){
    let header = new Map<string, string>();

    if (this.session) {
      header.set("X-Session", this.session.id);
      header.set("Accept-Language", "en");
    }

    return header;
  }

  logout() {
    let requestObservable = this.httpService.requestDeleteSession();
    requestObservable.subscribe(
      {
        next: response => {
          if (this.session.role === "whistleblower") {
            this.deleteSession();
            this.rootDataService.page="homepage";
          } else {
            this.deleteSession();
            this.loginRedirect(true);
          }
        },
        error: (error: any) => {
        }
      }
    );
  };

  loginRedirect(isLogout:boolean) {
    let source_path = location.pathname;


    if (!isLogout) {
      //location.assign("src", source_path);
    }

    if (source_path !== "/login") {
      location.replace("/login");

      //window.location = (<any>this.location)._platformLocation.location.href;
      //window.location.reload();
    }
  };

  constructor(public httpService: HttpService, public rootDataService:AppDataService, private router: Router, private translateService:TranslateService, private location:LocationStrategy, private httpClient: HttpClient) {
    let json = window.sessionStorage.getItem("session")
    if(json!=null){
      this.session = JSON.parse(json);
    }else {
      this.session = undefined
    }
  }
}
