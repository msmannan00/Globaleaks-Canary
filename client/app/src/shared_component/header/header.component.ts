import { Component } from '@angular/core';
import {AppConfigService} from "../../services/app-config.service";
import {AppDataService} from "../../app-data.service";

@Component({
  selector: 'views-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(public appConfig: AppConfigService, public appDataService:AppDataService) {
  }
}
