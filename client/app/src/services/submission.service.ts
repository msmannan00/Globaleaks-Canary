import { Injectable } from '@angular/core';
import {AppDataService} from "../app-data.service";
import {AuthenticationService} from "./authentication.service";
import {SubmissionResourceService} from "./submission-resource.service";

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  self:SubmissionService
  _submission:any;
  context:any;
  receivers :any=[];
  mandatory_receivers = 0;
  optional_receivers = 0;
  selected_receivers:any = {};

  setContextReceivers(context_id:number){
    this.context = this.appDataService.contexts_by_id[context_id];

    if (Object.keys(this.selected_receivers).length && this.context.allow_recipients_selection) {
      return;
    }

    this.selected_receivers = {};
    this.receivers = [];

    let self = this
    this.context.receivers.forEach(function (receiver:any) {
        let r = self.appDataService.receivers_by_id[receiver];

        if (!r) {
          return;
        }

        self.receivers.push(r);

        if (r.forcefully_selected) {
          self.mandatory_receivers += 1;
        } else {
          self.optional_receivers += 1;
        }

        if ((self.context.select_all_receivers) || r.forcefully_selected) {
          self.selected_receivers[r.id] = true;
        }
    });
  }

  countSelectedReceivers () {
    return Object.keys(this.selected_receivers).length;
  };

  create(context_id:any) {
    this.setContextReceivers(context_id);
    this.submissionResourceService.init(context_id)
    this.authenticationService.login(0, "whistleblower", "");
    this._submission = this.submissionResourceService
  };

  submit() {
    this._submission.receivers = [];
    let self = this
    this.selected_receivers.forEach(function (selected:any, id:any) {
      if (selected) {
        self._submission.receivers.push(id);
      }
    });

    return this._submission.$save().then(function(response:any) {
      location.pathname = "/";
      self.authenticationService.session.receipt = response.receipt;
      self.appDataService.page = "receiptpage";
    });
  };

  constructor(public appDataService:AppDataService, public authenticationService:AuthenticationService, public  submissionResourceService:SubmissionResourceService) {
    this.self = this;

  }
}
