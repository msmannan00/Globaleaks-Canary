import {Injectable} from '@angular/core';
import {HttpService} from "./services/http.service";
import {Root} from "./dataModels/public-model";
import {TranslateService} from "@ngx-translate/core";
import {errorCodes} from "./dataModels/error-code";

@Injectable({
  providedIn: 'root'
})
export class AppConfigService{

  public_node = <Root>{};
  appStarted:boolean = true;
  showLoadingPanel:boolean = false;
  sidebar = null;
  errorCodes = new errorCodes()
  pageTitle = "Globaleaks"
  projectTitle = ""
  header_title = ""


  constructor(public appServices: HttpService, public translateService: TranslateService) {
    this.localInitialization();
  }

  initTranslation(){
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
  }

  setHomepage() {
    location.replace("/");
  };

  initTitle(){
    if (!this.public_node) {
      return;
    }

    let projectTitle = this.public_node.node.name, pageTitle = this.public_node.node.header_title_homepage;


    if (location.pathname !== "/") {
      pageTitle = "Globaleaks";
    }

    //pageTitle = $filter("translate")(pageTitle);

    this.projectTitle = projectTitle !== "GLOBALEAKS" ? projectTitle : "";
    this.pageTitle = pageTitle !== projectTitle ? pageTitle : "";

    if (pageTitle) {
      window.document.title = projectTitle + " - " + pageTitle;
    } else {
      window.document.title = projectTitle;
    }
    this.pageTitle = "Globaleaks"

    alert(projectTitle)
    alert(pageTitle)

    //window.document.getElementsByName("description")[0].content = this.public_node.node.description;
  }

  private localInitialization(){
    this.appServices.getPublicResource().subscribe({
      next: data => {
        this.public_node = data;
        this.translateService.setDefaultLang(this.public_node.node.default_language);
        this.translateService.use(this.public_node.node.default_language);
        this.appStarted = true;
        this.initTitle()
      }
    });
  }
}
