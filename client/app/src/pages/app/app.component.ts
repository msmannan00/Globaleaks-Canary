import {Component} from '@angular/core';
import {AppConfigService} from "../../services/app-config.service";
import {AppDataService} from "../../app-data.service";
import {UtilsService} from "../../shared/services/utils.service";
import {TranslateService} from "@ngx-translate/core";
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent{

  showSidebar:boolean= true;
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
    private router : Router,
    public translate: TranslateService,
    public appConfig: AppConfigService, 
    public appDataService:AppDataService,
    public utilsService:UtilsService) {
  }
}
