import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FieldUtilitiesService} from "@app/shared/services/field-utilities.service";
import {ControlContainer, NgForm} from "@angular/forms";
import {SubmissionService} from "@app/services/submission.service";

@Component({
  selector: "src-form-field-input",
  templateUrl: "./form-field-input.component.html",
  viewProviders: [{provide: ControlContainer, useExisting: NgForm}]
})
export class FormFieldInputComponent implements OnInit {

  @Input() field: any;
  @Input() index: any;
  @Input() step: any;
  @Input() submission: SubmissionService;
  @Input() entryIndex: any;
  @Input() fieldEntry: any;
  @Input() entry: any;
  @Input() fieldId: any;
  @Input() displayErrors: boolean;
  @Input() answers: any;
  @Input() fields: any;
  @Input() uploads: any;
  @Input() identity_provided: any;
  @Input() fileUploadUrl: any;
  @Output() notifyFileUpload: EventEmitter<any> = new EventEmitter<any>();

  entryValue: any = "";
  fieldFormVar: any = {};
  fieldFormVarName: any;
  input_entryIndex = "";
  validator: any;
  rows: any;
  dateRange: any = {
    "start": "",
    "end": ""
  };

  constructor(private fieldUtilitiesService: FieldUtilitiesService) {
  }

  clearDateRange() {
    this.dateRange = {
      "start": "",
      "end": ""
    };
  }

  initializeFormNames() {
    this.input_entryIndex = "input-" + this.entryIndex;
  }

  ngOnInit(): void {
    this.fieldFormVarName = this.fieldUtilitiesService.fieldFormName(this.field.id + "$" + this.index);
    this.initializeFormNames();
    this.fieldEntry = this.fieldId + "-input-" + this.index;
    this.rows = this.fieldUtilitiesService.splitRows(this.field.children);
    if (this.field.type === "inputbox") {
      let validator_regex = this.fieldUtilitiesService.getValidator(this.field);
      if (validator_regex.length > 0) {
        this.validator = validator_regex;
      }
    }
  }

  validateUploadSubmission() {
    return !!(this.uploads && this.uploads[this.field ? this.field.id : "status_page"] != undefined && (this.field.type === "fileupload" && this.uploads && this.uploads[this.field ? this.field.id : "status_page"] && Object.keys(this.uploads[this.field ? this.field.id : "status_page"]).length === 0));
  }
}
