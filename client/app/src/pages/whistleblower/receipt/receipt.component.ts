import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from "@angular/core";
import {UtilsService} from "@app/shared/services/utils.service";
import {AuthenticationService} from "@app/services/authentication.service";
import {AppDataService} from "@app/app-data.service";

@Component({
  selector: "src-receipt-whistleblower",
  templateUrl: "./receipt.component.html"
})
export class ReceiptComponent implements AfterViewInit {
  receipt: any;

  constructor(protected utilsService: UtilsService, protected authenticationService: AuthenticationService, protected appDataService: AppDataService, private cdr: ChangeDetectorRef) {
  }

  public ngAfterViewInit(): void {
    if (this.authenticationService.session.receipt) {
      this.receipt = this.authenticationService.session.receipt;
    } else {
      this.receipt = this.appDataService.receipt;
    }
    this.cdr.detectChanges()
  }

  formatted_receipt(receipt: any) {
    if (!receipt || receipt.length !== 16) {
      return "";
    }
    return receipt.substring(0, 4) + " " + receipt.substring(4, 8) + " " + receipt.substring(8, 12) + " " + receipt.substring(12, 16);
  }
}
