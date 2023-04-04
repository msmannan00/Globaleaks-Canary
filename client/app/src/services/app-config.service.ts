import {Injectable} from '@angular/core';
import {HttpService} from "./internal/http.service";
import {TranslateService} from "@ngx-translate/core";
import {UtilsService} from "./utils.service";
import {AppDataService} from "../app-data.service";

@Injectable({
  providedIn: 'root'
})
export class AppConfigService{

  initTranslation(){
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
  }

  setHomepage() {
    location.replace("/");
  };

  setPage(page:string){
    this.rootDataService.page = page
  }

  initTitle(){
    if (!this.rootDataService.public_node) {
      return;
    }

    let projectTitle = this.rootDataService.public_node.node.name, pageTitle = this.rootDataService.public_node.node.header_title_homepage;



    if (location.pathname !== "/") {
      pageTitle = "Globaleaks";
    }

    if(pageTitle.length>0){
      pageTitle = this.translateService.instant("wow");
    }

    this.rootDataService.projectTitle = projectTitle !== "GLOBALEAKS" ? projectTitle : "";
    this.rootDataService.pageTitle = pageTitle !== projectTitle ? pageTitle : "";

    if (pageTitle) {
      pageTitle = this.translateService.instant("wow");
      window.document.title = projectTitle + " - " + pageTitle;
    } else {
      window.document.title = projectTitle;
    }

    let element = window.document.getElementsByName("description")[0]
    if (element instanceof HTMLMetaElement) {
      element.content = this.rootDataService.public_node.node.description;
    }
  }

  private localInitialization(){

    this.appServices.getPublicResource().subscribe({
      next: data => {
        this.rootDataService.public_node = data;
        this.translateService.setDefaultLang(this.rootDataService.public_node.node.default_language);
        this.translateService.use(this.rootDataService.public_node.node.default_language);
        this.rootDataService.appStarted = true;
        this.initTitle()
        this.utilsService.routeCheck()
      }
    });
  }

  constructor(public appServices: HttpService, public translateService: TranslateService, public utilsService:UtilsService, public rootDataService:AppDataService) {
    this.localInitialization();
  }
}
