import {Component} from '@angular/core';
import {AppConfigService} from "./services/app-config.service";
import {AppDataService} from "./app-data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  constructor(public appConfig: AppConfigService, public rootDataService:AppDataService) {

  }
}
