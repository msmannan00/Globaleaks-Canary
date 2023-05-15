import { Component } from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";
import {AppConfigService} from "../../../services/app-config.service";
import {AppDataService} from "../../../app-data.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'src-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent {
  formatted_receipt = "";

  constructor(public translateService:TranslateService, public authenticationService: AuthenticationService, public appConfig: AppConfigService, public  appDataService:AppDataService) {
  }
}
