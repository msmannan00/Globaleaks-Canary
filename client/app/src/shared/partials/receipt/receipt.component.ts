import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";
import {AppConfigService} from "../../../services/app-config.service";
import {AppDataService} from "../../../app-data.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'src-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit{
  formatted_receipt = "";

  ngOnInit(): void {
    let receipt = this.appDataService.receipt
    if (receipt && receipt.length == 16) {
      this.formatted_receipt = receipt.substr(0, 4) + " " + receipt.substr(4, 4) + " " + receipt.substr(8, 4) + " " + receipt.substr(12, 4);
      return;
    }
  }

  constructor(public translateService:TranslateService, public authenticationService: AuthenticationService, public appConfig: AppConfigService, public  appDataService:AppDataService) {
  }
}
