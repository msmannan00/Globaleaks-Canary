import { Component } from '@angular/core';
import {UtilsService} from "../../services/utils.service";
import {WbtipService} from "../../../services/wbtip.service";
import {AppDataService} from "../../../app-data.service";

@Component({
  selector: 'src-tip-submission-status',
  templateUrl: './tip-submission-status.component.html',
  styleUrls: ['./tip-submission-status.component.css']
})
export class TipSubmissionStatusComponent {

  updateSubmissionStatus() {
    this.tipService.tip.submissionStatusStr = this.utilsService.getSubmissionStatusText(this.tipService.tip.status, this.tipService.tip.substatus, this.appDataService.submission_statuses);
  };

  constructor(public utilsService:UtilsService, public tipService:WbtipService, public appDataService:AppDataService) {
  }
}
