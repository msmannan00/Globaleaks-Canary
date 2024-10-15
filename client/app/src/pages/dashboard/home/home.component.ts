import { Component, inject } from "@angular/core";
import {AppDataService} from "@app/app-data.service";
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from "@angular/common";
import { TippageComponent } from "../../whistleblower/tippage/tippage.component";
import { SubmissionComponent } from "../../whistleblower/submission/submission.component";
import { ReceiptComponent } from "../../whistleblower/receipt/receipt.component";
import { HomepageComponent } from "../../whistleblower/homepage/homepage.component";

@Component({
    selector: "src-dashboard-home",
    templateUrl: "./home.component.html",
    standalone: true,
    imports: [NgSwitch, NgSwitchCase, TippageComponent, SubmissionComponent, ReceiptComponent, NgSwitchDefault, HomepageComponent]
})
export class HomeComponent {
  protected appDataService = inject(AppDataService);
}
