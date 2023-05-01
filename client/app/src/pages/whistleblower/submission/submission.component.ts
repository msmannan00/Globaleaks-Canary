import {Component, ElementRef, ViewChild} from '@angular/core';
import {AppDataService} from "../../../app-data.service";
import {FieldUtilitiesService} from "../../../shared/services/field-utilities.service";
import {SubmissionService} from "../../../services/submission.service";
import {UtilsService} from "../../../shared/services/utils.service";
import {AuthenticationService} from "../../../services/authentication.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'src-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css']
})
export class SubmissionComponent{

  answers:any = {};
  @ViewChild('submissionForm') public submissionForm: NgForm;

  context_id = "";
  context:any = undefined;
  receiversOrderPredicate:any
  navigation = -1;
  validate:any = {};
  score = 0;
  done:boolean;
  uploads:any = {}
  field_id_map:any
  questionnaire:any
  receiver_selection_step: number;
  contextsOrderPredicate = this.appDataService.public.node.show_contexts_in_alphabetical_order ? "name" : "order";
  selectable_contexts :any[]
  submission:any
  show_steps_navigation_bar = false

  firstStepIndex() {
    return this.receiver_selection_step ? -1 : 0;
  };

  prepareSubmission(context:any){
    this.done = false;
    this.answers = {};
    this.uploads = {};
    this.questionnaire = context.questionnaire;

    this.submission.create(context.id);
    this.fieldUtilitiesService.onAnswersUpdate(this);
    this.context = context;

    this.field_id_map = this.fieldUtilitiesService.build_field_id_map(this.questionnaire);
    this.show_steps_navigation_bar = this.context.allow_recipients_selection || this.questionnaire.steps.length > 1;
    this.receiversOrderPredicate = this.submission.context.show_receivers_in_alphabetical_order ? "name" : null;

    if (this.context.allow_recipients_selection) {
      this.navigation = -1;
    } else {
      this.navigation = 0;
    }
  }

  selectable() {
    if (this.submission.context.maximum_selectable_receivers === 0) {
      return true;
    }
    return Object.keys(this.submission.selected_receivers).length < this.submission.context.maximum_selectable_receivers;
  };

  switch_selection(receiver:any) {
    if (receiver.forcefully_selected) {
      return;
    }

    if (this.submission.selected_receivers[receiver.id]) {
      delete this.submission.selected_receivers[receiver.id];
    } else if (this.selectable()) {
      this.submission.selected_receivers[receiver.id] = true;
    }
  };

  selectContext(context: any) {
    this.context = context
    this.prepareSubmission(context)
  }

  initializeSubmission(){
    this.submission = this.submissionService
    let context = null;

    this.selectable_contexts = this.appDataService.public.contexts.filter(context => !context.hidden);

    if (this.context_id) {
      context = this.appDataService.public.contexts.find(context => context.id === this.context);
      this.prepareSubmission(context)
    } else if (this.selectable_contexts.length === 1) {
      context = this.selectable_contexts[0];
      this.prepareSubmission(context)
    }

  }
  goToStep(step:number){
    this.navigation = step;
    this.utilsService.scrollToTop();
  }

  hasPreviousStep() {
    if (typeof this.context === "undefined") {
      return false;
    }

    return this.navigation > this.firstStepIndex();
  };

  areReceiversSelected() {
    return Object.keys(this.submission.selected_receivers).length > 0;
  };

  hasNextStep(){
    return this.navigation < this.lastStepIndex();
  }

  singleStepForm() {
    return this.firstStepIndex() === this.lastStepIndex();
  };

  stepForm(index:number):any {
    if (index !== -1) {
      let form = document.getElementById("step-"+index);
      return (form && form.querySelector(".inputelem.ng-invalid"));
    }
  };

  displayStepErrors(index:number) {
    if (index !== -1) {
      return this.stepForm(index);
    }
  };

  lastStepIndex() {
    let last_enabled = 0;

    for (let i = 0; i < this.questionnaire.steps.length; i++) {
      if (this.fieldUtilitiesService.isFieldTriggered(null, this.questionnaire.steps[i], this.answers, this.score)) {
        last_enabled = i;
      }
    }

    return last_enabled;
  };

  submissionHasErrors() {
    if (this.submissionForm) {
      return this.submissionForm.invalid || this.utilsService.isUploading(this.uploads);
    }

    return false;
  };

  displayErrors() {
    if (!(this.validate[this.navigation] || this.submission.done)) {
      return false;
    }

    if (!(this.hasPreviousStep() || !this.hasNextStep()) && !this.areReceiversSelected()) {
      return true;
    }

    if (!this.hasNextStep() && this.submissionHasErrors()) {
      return true;
    }
    if (this.displayStepErrors(this.navigation)) {
      return true;
    }
    return false;
  };

  checkForInvalidFields() {
    for(var i = 0; i <= this.navigation; i++) {
      if (this.questionnaire.steps[i].enabled) {
        let form = document.getElementById("step_" + i);
        if(form){
          let firstInvalid = form.querySelector(".inputelem.ng-invalid");

          if (firstInvalid) {
            return false;
          }
        }
      }
    }

    return true;
  }

  completeSubmission(){
    this.fieldUtilitiesService.onAnswersUpdate(this);

    this.validate[this.navigation] = true;

    if (!this.checkForInvalidFields()) {
      this.utilsService.scrollToTop();
      return;
    }

    //this.done = true;

    for (let key in this.uploads) {
      if (this.uploads[key]) {
        this.uploads[key].resume();
      }
    }

    //let self = this
    setInterval(() => {
      for (let key in this.uploads) {
        if (this.uploads[key] &&
            this.uploads[key].isUploading &&
            this.uploads[key].isUploading()) {
          return;
        }
      }

      // return $http.post("api/wbtip/" + $scope.tip.id + "/update",{"cmd": "additional_questionnaire", "answers": this.answers}).
      // then(function(){
      //   self.utilsService.reloadCurrentRoute()
      // });
    }, 1000);
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
      // this.submissionForm.$dirty = false;
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
      // this.submissionForm.dirty = false;
      for (var i = this.navigation - 1; i >= this.firstStepIndex(); i--) {
        if (i === -1 || this.fieldUtilitiesService.isFieldTriggered(null, this.questionnaire.steps[i], this.answers, this.score)) {
          this.navigation = i;
          this.utilsService.scrollToTop();
          return;
        }
      }
    }
  };

  constructor(public authenticationService:AuthenticationService, public appDataService:AppDataService,public utilsService:UtilsService ,public fieldUtilitiesService:FieldUtilitiesService, public submissionService:SubmissionService) {
    this.initializeSubmission();
  }

}
