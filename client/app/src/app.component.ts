import {Component} from '@angular/core';
import {AppConfigService} from "./services/app-config.service";
import {AppDataService} from "./app-data.service";
import {TranslationService} from "./services/translation.service";
import {UtilsService} from "./shared/services/utils.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{


  changeLang(lang: string) {
    this.translate.use(lang);
  }
  ngOnInit(){
    this.appConfig.routeChangeListener();
  }
  constructor(public translate: TranslateService, public appConfig: AppConfigService, public appDataService:AppDataService, public translateService:TranslationService,public utilsService:UtilsService) {

  }
}
