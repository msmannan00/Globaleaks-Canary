import { Component } from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";
import {WbtipService} from "../../../services/wbtip.service";
import {AppDataService} from "../../../app-data.service";
import {UtilsService} from "../../services/utils.service";

@Component({
  selector: 'src-tip-info',
  templateUrl: './tip-info.component.html',
  styleUrls: ['./tip-info.component.css']
})
export class TipInfoComponent {

  markReportStatus(date:any) {
    let report_date = new Date(date);
    let current_date = new Date();
    return current_date > report_date;
  };
  constructor(public authenticationService:AuthenticationService, public tipService:WbtipService, public appDataService:AppDataService, public utilsService:UtilsService) {
  }
  updateLabel(label: any) {
  }
}
