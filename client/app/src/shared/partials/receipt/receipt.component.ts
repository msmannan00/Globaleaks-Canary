import { Component } from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";
import {AppConfigService} from "../../../services/app-config.service";
import {AppDataService} from "../../../app-data.service";

@Component({
  selector: 'src-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent {
  formatted_receipt: any;

  constructor(public authentication: AuthenticationService, public appConfig: AppConfigService, public  appDataService:AppDataService) {
  }
}
