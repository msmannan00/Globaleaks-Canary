import {Component} from '@angular/core';
import {AppConfigService} from "./services/app-config.service";
import {AppDataService} from "./app-data.service";
import {TranslationService} from "./services/translation.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  constructor(public appConfig: AppConfigService, public appDataService:AppDataService, public translateService:TranslationService) {

  }
}
