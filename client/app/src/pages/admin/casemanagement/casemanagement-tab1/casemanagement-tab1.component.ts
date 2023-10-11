import { Component } from '@angular/core';
import {AppDataService} from "../../../../app-data.service";
import {HttpClient} from "@angular/common/http";
import {HttpService} from "../../../../shared/services/http.service";
import { UtilsService } from 'app/src/shared/services/utils.service';
import { StatuseResolver } from 'app/src/shared/resolvers/statuses.resolver';

@Component({
  selector: 'src-casemanagement-tab1',
  templateUrl: './casemanagement-tab1.component.html'
})
export class CasemanagementTab1Component {
  showAddStatus = false;
  new_submissions_status: any = {
    label: '',
  };

  constructor( private utilsService:UtilsService,private statuse:StatuseResolver,public appDataServices:AppDataService, private appDataService:AppDataService,private httpService: HttpService) {
  }

  toggleAddStatus() {
    this.showAddStatus = !this.showAddStatus;
  };

  addSubmissionStatus() {
    // const order = -1; // replace with the actual order value
    var order = this.utilsService.newItemOrder(this.appDataServices.submission_statuses, "order");
    const newSubmissionsStatus = {
      label: this.new_submissions_status.label,
      order: order
    };

    this.httpService.addSubmissionStatus(newSubmissionsStatus).subscribe(
      result => {
        this.appDataService.submission_statuses.push(result);
        this.new_submissions_status.label=''
      }
    );
  };
}
