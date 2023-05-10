import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {NgForm} from "@angular/forms";
import {WbtipService} from "../../services/wbtip.service";
import {FieldUtilitiesService} from "../../shared/services/field-utilities.service";
import {UtilsService} from "../../shared/services/utils.service";
import {AppDataService} from "../../app-data.service";
import {SubmissionService} from "../../services/submission.service";
import {HttpService} from "../../shared/services/http.service";
import {Router} from "@angular/router";

@Component({
  selector: 'src-tip-additional-questionnaire-form',
  templateUrl: './tip-additional-questionnaire-form.component.html',
  styleUrls: ['./tip-additional-questionnaire-form.component.css']
})
export class TipAdditionalQuestionnaireFormComponent implements OnInit{

  @ViewChild('submissionForm') public submissionForm: NgForm;
  @ViewChildren('stepform') stepforms: QueryList<NgForm>;

  validate:any = {};
  navigation = 0;
  score = 0;
  questionnaire:any
  answers:any = {};
  field_id_map:any
  done:boolean;
  uploads:any = {}

  singleStepForm() {
    return this.firstStepIndex() === this.lastStepIndex();
  };

  goToStep(step:number){
    this.navigation = step;
    this.utilsService.scrollToTop();
  }

  firstStepIndex() {
    return 0;
  };

  lastStepIndex(){
    let last_enabled = 0;

    for (var i = 0; i < this.questionnaire.steps.length; i++) {
      if (this.questionnaire.steps[i].enabled) {
        last_enabled = i;
      }
    }

    return last_enabled;
  };

  hasNextStep() {
    return this.navigation < this.lastStepIndex();
  };

  hasPreviousStep() {
    return this.navigation > this.firstStepIndex();
  };

  checkForInvalidFields() {
    for(let counter = 0; counter <= this.stepforms.length; counter++) {
      if (this.stepforms.get(counter)?.invalid) {
        return false
      }
    }
    return true;
  }

  runValidation() {
    this.validate[this.navigation] = true;

    if (this.navigation > -1 && !this.checkForInvalidFields()) {
      this.utilsService.scrollToTop();
      return false;
    }

    return true;
  };

  incrementStep(){
    if (!this.runValidation()) {
      return;
    }

    if (this.hasNextStep()) {
      for (let i = this.navigation + 1; i <= this.lastStepIndex(); i++) {
        if (this.fieldUtilitiesService.isFieldTriggered(null, this.questionnaire.steps[i], this.answers, this.score)) {
          this.navigation = i;
          this.utilsService.scrollToTop();
          return;
        }
      }
    }
  }

  decrementStep() {
    if (this.hasPreviousStep()) {
      for (let i = this.navigation - 1; i >= this.firstStepIndex(); i--) {
        if (i === -1 || this.fieldUtilitiesService.isFieldTriggered(null, this.questionnaire.steps[i], this.answers, this.score)) {
          this.navigation = i;
          this.utilsService.scrollToTop();
          return;
        }
      }
    }
  };

  areReceiversSelected() {
    return true;
  };

  submissionHasErrors() {
    return false;
  };

  prepareSubmission() {
    this.done = false;
    this.answers = {};
    this.uploads = {};
    this.questionnaire = this.wbtipService.tip.additional_questionnaire;
    this.fieldUtilitiesService.onAnswersUpdate(this);
    this.field_id_map = this.fieldUtilitiesService.build_field_id_map(this.questionnaire);
  };

  completeSubmission(){
    this.fieldUtilitiesService.onAnswersUpdate(this);

    if (!this.runValidation()) {
      this.utilsService.scrollToTop()
      return;
    }

    this.done = true;
    for (let key in this.uploads) {
      if (this.uploads[key] && this.uploads[key].flowFile) {
        this.uploads[key].flowFile.resume()
      }
    }

    let intervalId = setInterval(() => {
      if(this.uploads){
        for (let key in this.uploads) {

          if(this.uploads[key].flowFile && this.uploads[key].flowFile.isUploading()){
            return
          }
        }
      }

      this.httpService.whistleBlowerTipUpdate({"cmd": "additional_questionnaire", "answers": this.answers}, this.wbtipService.tip.id).subscribe
      (
          {
            next: response => {
              this.utilsService.reloadCurrentRoute()
            },
            error: (error: any) => {
              alert(JSON.stringify(error))
            }
          }
      );

      clearInterval(intervalId);
      this.activeModal.dismiss()
    }, 1000);
  }

  stepForm(index:any):any {
    if (this.stepforms && index !== -1) {
      return this.stepforms.get(index)
    }
  };

  displayStepErrors(index:number):any {
    if (index !== -1) {
      let response = this.stepForm(index)
      if(response){
        return response?.invalid
      }else {
        return false
      }
    }
  };

  displayErrors() {
    if (!(this.validate[this.navigation])) {
      return false;
    }

    return !!this.displayStepErrors(this.navigation);

  };

  onFormChange() {
    this.fieldUtilitiesService.onAnswersUpdate(this);
  }

  ngOnInit(): void {
    this.prepareSubmission();
  }

  constructor(public httpService: HttpService, public rootDataService:AppDataService, private router: Router, public submissionService:SubmissionService, public appDataService:AppDataService, public wbtipService:WbtipService,public activeModal: NgbActiveModal, public fieldUtilitiesService:FieldUtilitiesService, public utilsService:UtilsService) {
  }

  protected readonly JSON = JSON;
}