import {Component, OnInit} from "@angular/core";
import {AuthenticationService} from "@app/services/authentication.service";
import {AppDataService} from "@app/app-data.service";

@Component({
  selector: "src-receipt",
  templateUrl: "./receipt.component.html"
})
export class ReceiptComponent implements OnInit {
  formattedReceipt = "";

  constructor(protected authenticationService: AuthenticationService, protected appDataService: AppDataService) {
  }

  ngOnInit(): void {
    let receipt = this.appDataService.receipt;
    if (receipt && receipt.length == 16) {
      this.formattedReceipt = receipt.slice(0, 4) + " " + receipt.slice(4, 4) + " " + receipt.slice(8, 4) + " " + receipt.slice(12, 4);
      return;
    }
  }
}
