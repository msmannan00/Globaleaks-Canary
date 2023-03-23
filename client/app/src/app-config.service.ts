import {Injectable} from '@angular/core';
import {HttpService} from "./services/http.service";
import {Error, Root} from "./models/public-model";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class AppConfigService{

  public_node = <Root>{};
  appStarted:boolean = false;
  showLoadingPanel:boolean = false;
  sidebar = null;
  error = <Error>{};

  constructor(public appServices: HttpService, public translateService: TranslateService) {
    this.localInitialization();
  }

  initTranslation(){
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
  }

  private localInitialization(){
    this.appServices.getPublicResource().subscribe({
      next: data => {
        this.public_node = data;
        this.translateService.setDefaultLang(this.public_node.node.default_language);
        this.translateService.use(this.public_node.node.default_language);
        this.appStarted = true;
      }
    });
  }
}
