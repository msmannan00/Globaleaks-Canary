import { Injectable } from '@angular/core';
import {AppConfigService} from "./app-config.service";
import {AuthenticationService} from "./authentication.service";
import {AppDataService} from "../app-data.service";

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

  showWBLoginBox(){
    return location.pathname === "/submission";
  }
  showUserStatusBox() {
    return this.appDataService.public_node.node.wizard_done &&
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
    if (this.appDataService.public_node.node.custom_support_url) {
      window.open(this.appDataService.public_node.node.custom_support_url, "_blank");
    } else {
      return this.openConfirmableModalDialog("views/modals/request_support.html", {});
    }
  }

  routeCheck(){
    let path = location.pathname;
    if (path !== "/") {
      this.appConfigService.setPage("")
    }

    if (!this.appDataService.public_node) {
      return;
    }

    if (!this.appDataService.public_node.node.wizard_done) {
      location.replace("/wizard");
    } else if (path === "/" && this.appDataService.public_node.node.enable_signup) {
      this.appConfigService.setPage("signuppage")
    } else if ((path === "/" || path === "/submission") && this.appDataService.public_node.node.adminonly && !this.authenticationService.session) {
      location.replace("/admin");
    }

  }

  constructor(public appConfigService: AppConfigService, public authenticationService:AuthenticationService, public appDataService:AppDataService) {
  }

}
