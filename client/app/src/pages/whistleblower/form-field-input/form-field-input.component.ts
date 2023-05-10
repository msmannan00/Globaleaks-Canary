import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FieldUtilitiesService} from "../../../shared/services/field-utilities.service";
import {ControlContainer, NgForm, NgModelGroup} from "@angular/forms";
import {SubmissionService} from "../../../services/submission.service";

@Component({
  selector: 'src-form-field-input',
  templateUrl: './form-field-input.component.html',
  styleUrls: ['./form-field-input.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class FormFieldInputComponent implements OnInit{

  @Input() field:any
  @Input() index:any
  @Input() step:any
  @Input() submission:SubmissionService
  @Input() entryIndex:any
  @Input() fieldEntry:any
  @Input() entry:any
  @Input() fieldId:any
  @Input() displayErrors: boolean;
  @Input() answers:any
  @Input() fields:any
  @Input() uploads:any
  @Input() identity_provided:any

  entryvalue: any = "";
  fieldFormVar: any = {};
  fieldFormVarName: any;
  input_entryIndex = ""
  validator:any
  rows:any
  daterange: any = {
    "start": "",
    "end": ""
  };

  clearDateRange(){
    this.daterange = {
      "start": "",
      "end": ""
    };
  }

  initializeFormNames(){
    this.input_entryIndex = "input-"+this.entryIndex
  }

  ngOnInit(): void {
    this.fieldFormVarName = this.fieldUtilitiesService.fieldFormName(this.field.id + "$" + this.index);
    this.initializeFormNames();
    this.fieldEntry = this.fieldId + "-input-" + this.index;
    this.rows = this.fieldUtilitiesService.splitRows(this.field.children);
    if (this.field.type === "inputbox") {
      let validator_regex = this.fieldUtilitiesService.getValidator(this.field);
      if(validator_regex.length>0){
        this.validator = validator_regex
      }
    }
  }

  validateUploadSubmission(){

    if(this.uploads && this.uploads[this.field ? this.field.id : 'status_page']!=undefined && (this.field.type == 'fileupload' && this.uploads && this.uploads[this.field ? this.field.id : 'status_page'] && Object.keys(this.uploads[this.field ? this.field.id : 'status_page']).length==0)){
      return true
    }

    return false
  }
  constructor(public fieldUtilitiesService:FieldUtilitiesService) {
  }

}
