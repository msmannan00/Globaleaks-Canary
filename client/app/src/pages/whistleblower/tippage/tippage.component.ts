import {Component} from '@angular/core';
import {FieldUtilitiesService} from "../../../shared/services/field-utilities.service";
import {ActivatedRoute} from "@angular/router";
import {HttpService} from "../../../shared/services/http.service";
import {WbtipService} from "../../../services/wbtip.service";
import {AppDataService} from "../../../app-data.service";
import {UtilsService} from "../../../shared/services/utils.service";
import {Observable} from "rxjs";
import {WBTipData} from "../../../models/whistleblower/WBTipData";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'src-tippage',
  templateUrl: './tippage.component.html',
  styleUrls: ['./tippage.component.css']
})
export class TippageComponent {

  fileupload_url: string;
  tip_id = null;
  itemsPerPage = 5;
  currentCommentsPage = 1;
  currentMessagesPage = 1;
  answers = {};
  uploads:any = {};
  showEditLabelInput = false;
  score = 0;
  ctx:string;
  rows:any
  questionnaire: any;
  private submission: any;
  public tip:any
  questionnaires:any
  private fields: any;
  identity_provided = false

  openGrantTipAccessModal() {

  }

  openRevokeTipAccessModal() {

  }

  getAnswersEntries(entry:any) {
  };

  filterNotTriggeredField(parent:any, field:any, answers:any) {
    let i;
    if (this.fieldUtilities.isFieldTriggered(parent, field, answers, this.score)) {
      for(i=0; i<field.children.length; i++) {
        this.filterNotTriggeredField(field, field.children[i], answers);
      }
    }
  };

  preprocessTipAnswers(tip:any) {
    let x, i, j, k, questionnaire, step;

    for (x=0; x<tip.questionnaires.length; x++) {
      this.questionnaire = tip.questionnaires[x];
      this.fieldUtilities.parseQuestionnaire(this.questionnaire, {});

      for (i=0; i<this.questionnaire.steps.length; i++) {
        step = this.questionnaire.steps[i];
        if (this.fieldUtilities.isFieldTriggered(null, step, this.questionnaire.answers, this.tip.score)) {
          for (j=0; j<step.children.length; j++) {
            this.filterNotTriggeredField(step, step.children[j], this.questionnaire.answers);
          }
        }
      }

      for (i=0; i<this.questionnaire.steps.length; i++) {
        step = this.questionnaire.steps[i];
        j = step.children.length;
        while (j--) {
          if (step.children[j]["template_id"] === "whistleblower_identity") {
            this.tip.whistleblower_identity_field = step.children[j];
            this.tip.whistleblower_identity_field.enabled = true;
            step.children.splice(j, 1);

            this.questionnaire = {
              steps: [{... this.tip.whistleblower_identity_field}]
            };

            this.tip.fields = this.questionnaire.steps[0].children;
            this.rows = this.fieldUtilities.splitRows(this.tip.fields);
            this.fieldUtilities.onAnswersUpdate(this);

            for (k=0; k<this.tip.whistleblower_identity_field.children.length; k++) {
              this.filterNotTriggeredField(this.tip.whistleblower_identity_field, this.tip.whistleblower_identity_field.children[k], this.tip.data.whistleblower_identity);
            }
          }
        }
      }
    }
  }

  hasMultipleEntries(field_answer:any) {
    return (typeof field_answer !== undefined) && field_answer.length > 1;
  };

  filterFields(field:any) {
    return field.type !== "fileupload";
  };

  editLabel() {
    this.showEditLabelInput = true;
  };

  markReportStatus(date:any) {
    let report_date = new Date(date);
    let current_date = new Date();
    return current_date > report_date;
  };

  updateLabel(label:any) {
  };

  updateSubmissionStatus() {
  };

  newComment() {
  };

  uploading(){
    return this.utilsService.isUploading(this.uploads)
  }

  calculateEstimatedTime(){
    let time = 0
    for (let key in this.uploads) {
      if(this.uploads[key].flowFile && this.uploads[key].flowFile.isUploading()){
        time = time + this.uploads[key].flowFile.timeRemaining()
      }
    }
    return time
  }

  calculateProgress(){
    let progress = 0
    let totalFiles = 0
    for (let key in this.uploads) {
      if(this.uploads[key].flowFile){
        progress = progress + this.uploads[key].flowFile.timeRemaining()
        totalFiles+=1
      }
    }
    if(totalFiles==0){
      return 0
    }

    return (100 - (progress/totalFiles)*100)
  }
  newMessage() {
  };

  tip_toggle_star() {
  };

  tip_notify(enable:any) {
  };

  ngOnInit() {

    let requestObservable:Observable<any> = this.httpService.whistleBlowerTip()
    requestObservable.subscribe(
        {
          next: (response:WBTipData) => {
            this.wbtipService.initialize(response)
            this.tip = this.wbtipService.tip;

            this.activatedRoute.queryParams.subscribe(params => {
              this.tip.tip_id = params['tip_id']
            });

            this.fileupload_url = "api/whistleblower/wbtip/rfile";
            this.tip.context = this.appDataService.contexts_by_id[this.tip.context_id];

            this.tip.receivers_by_id = this.utilsService.array_to_map(this.tip.receivers);
            this.score = this.tip.score;
            this.ctx = "wbtip";
            this.preprocessTipAnswers(this.tip);

            this.tip.submissionStatusStr = this.utilsService.getSubmissionStatusText(this.tip.status, this.tip.substatus, this.appDataService.submission_statuses)
            this.submission = {};
            this.submission._submission = this.tip;
            if (this.tip.receivers.length === 1 && this.tip.msg_receiver_selected === null) {
              this.tip.msg_receiver_selected = this.tip.msg_receivers_selector[0].key;
            }
          },
          error: (error: any) => {
          }
        }
    )
  }

  provideIdentityInformation(eventData: { param1: string, param2: number }) {
    let intervalId = setInterval(() => {
      if(this.uploads){
        for (let key in this.uploads) {

          if(this.uploads[key].flowFile && this.uploads[key].flowFile.isUploading()){
            return
          }
        }
      }

      this.httpService.whistleBlowerIdentityUpdate({"identity_field_id": this.tip.whistleblower_identity_field.id, "identity_field_answers": this.answers}, this.wbtipService.tip.id).subscribe
      (
          {
            next: response => {
              clearInterval(intervalId); // Clear the interval
              this.utilsService.reloadCurrentRoute();
            },
            error: (error: any) => {
              clearInterval(intervalId); // Clear the interval
              this.utilsService.reloadCurrentRoute();
            }
          }
      );

    }, 1000);

  }

  onFormChange() {
    this.fieldUtilitiesService.onAnswersUpdate(this);
  }

  constructor(public fieldUtilitiesService:FieldUtilitiesService,public authenticationService:AuthenticationService, public utilsService:UtilsService, public appDataService:AppDataService, public fieldUtilities:FieldUtilitiesService, private activatedRoute: ActivatedRoute, private httpService:HttpService, public wbtipService:WbtipService) {
  }

  protected readonly JSON = JSON;
}
