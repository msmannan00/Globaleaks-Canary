import { Component, Input, OnInit } from '@angular/core';
import {UtilsService} from "../../services/utils.service";
import {WbtipService} from "../../../services/wbtip.service";
import {AppDataService} from "../../../app-data.service";
import { RecieverTipService } from 'app/src/services/recievertip.service';

@Component({
  selector: 'src-tip-submission-status',
  templateUrl: './tip-submission-status.component.html',
  styleUrls: ['./tip-submission-status.component.css']
})
export class TipSubmissionStatusComponent {
  @Input() tipService: RecieverTipService | WbtipService  ;
  updateSubmissionStatus() {
    this.tipService.tip.submissionStatusStr = this.utilsService.getSubmissionStatusText(this.tipService.tip.status, this.tipService.tip.substatus, this.appDataService.submission_statuses);
  };
  ngOnInit(){
  }
  constructor(public utilsService:UtilsService,  public appDataService:AppDataService) {
  }
}
