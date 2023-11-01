import {Component, OnInit} from "@angular/core";
import {UtilsService} from "@app/shared/services/utils.service";
import {AuthenticationService} from "@app/services/authentication.service";
import {AppDataService} from "@app/app-data.service";

@Component({
  selector: "src-receipt-whistleblower",
  templateUrl: "./receipt.component.html"
})
export class ReceiptComponent implements OnInit {
  receipt: any;
  receiptId: string = "";

  constructor(protected utilsService: UtilsService, protected authenticationService: AuthenticationService, protected appDataService: AppDataService) {
  }

  public ngOnInit(): void {
    if (this.authenticationService.session.receipt) {
      this.receipt = this.authenticationService.session.receipt;
    } else {
      this.receipt = this.appDataService.receipt;
    }
    this.receiptId = this.receipt.substring(0, 4) + " " + this.receipt.substring(4, 8) + " " + this.receipt.substring(8, 12) + " " + this.receipt.substring(12, 16);
  }
}
