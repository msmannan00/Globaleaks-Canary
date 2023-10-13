import {Component, OnInit} from "@angular/core";
import {AuthenticationService} from "@app/services/authentication.service";
import {AppDataService} from "@app/app-data.service";

@Component({
  selector: "src-receipt",
  templateUrl: "./receipt.component.html"
})
export class ReceiptComponent implements OnInit {
  formattedReceipt = "";

  constructor(public authenticationService: AuthenticationService, public appDataService: AppDataService) {
  }

  ngOnInit(): void {
    let receipt = this.appDataService.receipt;
    if (receipt && receipt.length == 16) {
      this.formattedReceipt = receipt.substr(0, 4) + " " + receipt.substr(4, 4) + " " + receipt.substr(8, 4) + " " + receipt.substr(12, 4);
      return;
    }
  }
}
