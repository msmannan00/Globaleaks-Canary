import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {AppDataService} from "../../../app-data.service";
import {FieldUtilitiesService} from "../../../shared/services/field-utilities.service";
import {SubmissionService} from "../../../services/submission.service";
import {UtilsService} from "../../../shared/services/utils.service";
import {AuthenticationService} from "../../../services/authentication.service";
import {AbstractControl, FormGroup, NgForm} from "@angular/forms";

@Component({
  selector: 'src-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css']
})
export class SubmissionComponent{
  answers:any = {};
  @ViewChild('submissionForm') public submissionForm: NgForm;
  @ViewChildren('stepform') stepforms: QueryList<NgForm>;
  stepformlist:any = {}

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
  submission:SubmissionService
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

  onFieldUpdated(){
  }

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

  initStepForm(form:NgForm, id:any){
    this.stepformlist[id] = form
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

  displayErrors() {
    if (!(this.validate[this.navigation])) {
      return false;
    }

    if (!(this.hasPreviousStep() || !this.hasNextStep()) && !this.areReceiversSelected()) {
      return true;
    }

    if (!this.hasNextStep() && this.submissionHasErrors()) {
      return true;
    }
    if(this.displayStepErrors(this.navigation)) {
      return true;
    }
    return false;
  };

  checkForInvalidFields() {
    for(let counter = 0; counter <= this.stepforms.length; counter++) {
      if (this.stepforms.get(counter)?.invalid) {
        return false
      }
    }
    return true;
  }

  completeSubmission(){
    this.fieldUtilitiesService.onAnswersUpdate(this);
    if (!this.runValidation()) {
      this.utilsService.scrollToTop()
      return;
    }

    this.done = true;

    this.submission._submission.answers = this.answers;

    this.utilsService.resumeFileUploads(this.uploads);

    let intervalId = setInterval(() => {
      if(this.uploads){
        for (let key in this.uploads) {

          if(this.uploads[key].flowFile && this.uploads[key].flowFile.isUploading()){
            return
          }
        }
      }

      this.submission.submit();
      clearInterval(intervalId); // Clear the interval
    }, 1000);
  }

  runValidation() {
    this.validate[this.navigation] = true;

    if (!this.areReceiversSelected() || !this.checkForInvalidFields()) {
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

  onFormChange() {
    this.fieldUtilitiesService.onAnswersUpdate(this);
  }

  constructor(public authenticationService:AuthenticationService, public appDataService:AppDataService,public utilsService:UtilsService ,public fieldUtilitiesService:FieldUtilitiesService, public submissionService:SubmissionService) {
    this.initializeSubmission();
  }
}
