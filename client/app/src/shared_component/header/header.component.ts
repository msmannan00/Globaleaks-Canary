import { Component } from '@angular/core';
import {AppConfigService} from "../../app-config.service";

@Component({
  selector: 'views-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(public appConfig: AppConfigService) {
  }
  setHomepage(){
  }
}
