import { Injectable } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {AppDataService} from "../../app-data.service";
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  str2Uint8Array(str:string){
    let result = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) {
      result[i] = str.charCodeAt(i);
    }
    return result;
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  showWBLoginBox(){
    return location.pathname === "/submission";
  }
  showUserStatusBox() {
    return this.appDataService.public.node.wizard_done &&
      this.appDataService.page !== "homepage" &&
      this.appDataService.page !== "submissionpage" &&
      this.authenticationService.session &&
      !this.authenticationService.session.require_password_change;
  }

  openConfirmableModalDialog(template:any, arg:any, scope?:any){
    /*scope = !scope ? $rootScope : scope;

    var modal = $uibModal.open({
      templateUrl: template,
      controller: "ConfirmableModalCtrl",
      scope: scope,
      resolve: {
        arg: function () {
          return arg;
        },
        confirmFun: null,
        cancelFun: null
      }
    });

    return modal.result;*/

  }

  openSupportModal() {
    if (this.appDataService.public.node.custom_support_url) {
      window.open(this.appDataService.public.node.custom_support_url, "_blank");
    } else {
      return this.openConfirmableModalDialog("views/modals/request_support.html", {});
    }
  }

  routeCheck(){
    let path = location.pathname;
    if (path !== "/") {
      this.appDataService.page = ""
    }

    if (!this.appDataService.public) {
      return;
    }

    if (!this.appDataService.public.node.wizard_done) {
      location.replace("/wizard");
    } else if (path === "/" && this.appDataService.public.node.enable_signup) {
      this.appDataService.page = "signuppage"

    } else if ((path === "/" || path === "/submission") && this.appDataService.public.node.adminonly && !this.authenticationService.session) {
      location.replace("/admin");
    }
  }

  setTitle(){
    if (!this.appDataService.public) {
      return;
    }

    let projectTitle = this.appDataService.public.node.name, pageTitle = this.appDataService.public.node.header_title_homepage;



    if (location.pathname !== "/") {
      pageTitle = "Globaleaks";
    }

    if(pageTitle.length>0){
      pageTitle = this.translateService.instant("wow");
    }

    this.appDataService.projectTitle = projectTitle !== "GLOBALEAKS" ? projectTitle : "";
    this.appDataService.pageTitle = pageTitle !== projectTitle ? pageTitle : "";

    if (pageTitle) {
      pageTitle = this.translateService.instant("wow");
      window.document.title = projectTitle + " - " + pageTitle;
    } else {
      window.document.title = projectTitle;
    }

    let element = window.document.getElementsByName("description")[0]
    if (element instanceof HTMLMetaElement) {
      element.content = this.appDataService.public.node.description;
    }
  }
  array_to_map(receivers: any[]) {
    let ret = new Map<any, any>();
    receivers.forEach((item, index) => {
      ret.set(index, item);
    });

    return ret;
  }

  constructor(public authenticationService:AuthenticationService, public appDataService:AppDataService, public translateService: TranslateService, private router: Router) {
  }

}
