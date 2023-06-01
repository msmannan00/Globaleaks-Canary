import {Component} from '@angular/core';
import {AppConfigService} from "./services/app-config.service";
import {AppDataService} from "./app-data.service";
import {TranslationService} from "./services/translation.service";
import {UtilsService} from "./shared/services/utils.service";
import {TranslateService} from "@ngx-translate/core";
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  showSidebar:boolean= true;
  changeLang(lang: string) {
    this.translate.use(lang);
  }
  checkToShowSidebar(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const excludedUrls = [
          '/recipient/reports'
        ];
        const currentUrl = event.url;
        this.showSidebar = !excludedUrls.includes(currentUrl);
      }
    });
  }
  ngOnInit(){
    this.appConfig.routeChangeListener();
    this.checkToShowSidebar()
  }
  constructor(
    public translate: TranslateService, 
    public appConfig: AppConfigService, 
    public appDataService:AppDataService, 
    public translateService:TranslationService,
    public utilsService:UtilsService,
    public router : Router) {
    
  }
}
