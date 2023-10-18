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
    const receipt = this.appDataService.receipt;
    if (receipt && receipt.length === 16) {
      this.formattedReceipt = receipt.substring(0, 4) + " " + receipt.substring(4, 8) + " " + receipt.substring(8, 12) + " " + receipt.substring(12, 16);
      return;
    }
  }
}
