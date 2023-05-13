import { Component } from '@angular/core';
import {UtilsService} from "../../../shared/services/utils.service";
import {AuthenticationService} from "../../../services/authentication.service";
import {AppDataService} from "../../../app-data.service";

@Component({
  selector: 'src-receipt-whistleblower',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent {
  formatted_receipt(receipt:any){
    if (!receipt || receipt.length !== 16) {
      return "";
    }
    return receipt.substr(0, 4) + " " + receipt.substr(4, 4) + " " + receipt.substr(8, 4) + " " + receipt.substr(12, 4);
  }

  constructor(public utilsService:UtilsService, public authenticationService:AuthenticationService, public appDataService:AppDataService) {
  }

}
