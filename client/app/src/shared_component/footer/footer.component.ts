import { Component } from '@angular/core';
import {AppConfigService} from "../../services/app-config.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(public appConfig: AppConfigService) {
  }
}
