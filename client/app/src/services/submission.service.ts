import { Injectable } from '@angular/core';
import {AppDataService} from "../app-data.service";
import {AuthenticationService} from "./authentication.service";
import {SubmissionResourceService} from "./submission-resource.service";
import {HttpService} from "../shared/services/http.service";
import {Router} from "@angular/router";

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
  blocked = false
  uploads:any = {}
  errorComponentState:any = {}

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

    for (const key in this.selected_receivers) {
      if (this.selected_receivers.hasOwnProperty(key)) {
        alert(key)
        self._submission.receivers.push(key);
      }
    }

    let _submission_data =  {
      context_id: this._submission.context_id,
      receivers: this._submission.receivers,
      identity_provided: this._submission.identity_provided,
      answers: this._submission.answers,
      answer: this._submission.answer,
      score: this._submission.score
    };

    const param=JSON.stringify(_submission_data);
    this.httpService.requestReportSubmission(param).subscribe
    (
        {
          next: response => {
            location.pathname = "/";
            self.authenticationService.session.receipt = response.receipt;
            self.appDataService.page = "receiptpage";
          },
          error: (error: any) => {
            alert(JSON.stringify(error))
          }
        }
    );
  };

  constructor(private router: Router, public httpService: HttpService, public appDataService:AppDataService, public authenticationService:AuthenticationService, public  submissionResourceService:SubmissionResourceService) {
    this.self = this;

  }
}
