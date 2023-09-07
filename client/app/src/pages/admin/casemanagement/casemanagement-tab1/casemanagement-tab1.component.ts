import { Component } from '@angular/core';
import {AppDataService} from "../../../../app-data.service";
import {HttpClient} from "@angular/common/http";
import {HttpService} from "../../../../shared/services/http.service";

@Component({
  selector: 'src-casemanagement-tab1',
  templateUrl: './casemanagement-tab1.component.html'
})
export class CasemanagementTab1Component {
  showAddStatus = false;
  new_submissions_status: any = {
    label: '',
  };

  constructor(public appDataServices:AppDataService, private appDataService:AppDataService,private httpService: HttpService) {
  }

  toggleAddStatus() {
    this.showAddStatus = !this.showAddStatus;
  };

  addSubmissionStatus() {
    const order = -1; // replace with the actual order value
    const newSubmissionsStatus = {
      label: this.new_submissions_status.label,
      order: order
    };

    this.httpService.addSubmissionStatus(newSubmissionsStatus).subscribe(
      result => {
        this.appDataService.submission_statuses.push(result);
      }
    );
  };
}
