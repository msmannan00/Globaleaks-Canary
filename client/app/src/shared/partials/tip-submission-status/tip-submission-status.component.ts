import {Component, Input} from "@angular/core";
import {UtilsService} from "@app/shared/services/utils.service";
import {WbtipService} from "@app/services/wbtip.service";
import {AppDataService} from "@app/app-data.service";
import {ReceiverTipService} from "@app/services/receiver-tip.service";
import {HttpService} from "@app/shared/services/http.service";

@Component({
  selector: "src-tip-submission-status",
  templateUrl: "./tip-submission-status.component.html"
})
export class TipSubmissionStatusComponent {
  @Input() tipService: ReceiverTipService | WbtipService;

  constructor(protected httpService: HttpService, protected utilsService: UtilsService, protected appDataService: AppDataService) {
  }

  updateSubmissionStatus() {
    this.tipService.tip.substatus = "";
    const args = {"status": this.tipService.tip.status, "substatus": ""};
    this.httpService.tipOperation("update_status", args, this.tipService.tip.id)
      .subscribe(
        () => {
          this.utilsService.reloadCurrentRoute();
        }
      );
  };

  updateSubmissionSubStatus() {
    const args = {
      "status": this.tipService.tip.status,
      "substatus": this.tipService.tip.substatus ? this.tipService.tip.substatus : ""
    };
    this.httpService.tipOperation("update_status", args, this.tipService.tip.id)
      .subscribe(
        () => {
          this.utilsService.reloadCurrentRoute();
        }
      );
  };

}
