import { Component, Input, OnInit } from '@angular/core';
import { UtilsService } from "../../services/utils.service";
import { WbtipService } from "../../../services/wbtip.service";
import { AppDataService } from "../../../app-data.service";
import { RecieverTipService } from 'app/src/services/recievertip.service';
import { HttpService } from "../../services/http.service";

@Component({
  selector: 'src-tip-submission-status',
  templateUrl: './tip-submission-status.component.html',
  styleUrls: ['./tip-submission-status.component.css']
})
export class TipSubmissionStatusComponent implements OnInit {
  @Input() tipService: RecieverTipService | WbtipService;
  tip_status: any
  updateSubmissionStatus() {
    this.tipService.tip.substatus = ""
    let args = { "status": this.tipService.tip.status, "substatus": "" }
    this.httpService.tipOperation('update_status', args, this.tipService.tip.id)
      .subscribe(
        () => {
          this.utilsService.reloadCurrentRoute();
        }
      );
  };
  updateSubmissionSubStatus() {
    let args = { "status": this.tipService.tip.status, "substatus": this.tipService.tip.substatus ? this.tipService.tip.substatus : "" }
    this.httpService.tipOperation('update_status', args, this.tipService.tip.id)
      .subscribe(
        () => {
          this.utilsService.reloadCurrentRoute();
        }
      );
  };
  ngOnInit() { }

  constructor(public httpService: HttpService, public utilsService: UtilsService, public appDataService: AppDataService) {
  }

  protected readonly JSON = JSON;
}
