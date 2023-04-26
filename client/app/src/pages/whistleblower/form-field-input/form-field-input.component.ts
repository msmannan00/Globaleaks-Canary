import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FieldUtilitiesService} from "../../../shared/services/field-utilities.service";
import {ControlContainer, NgForm} from "@angular/forms";
import getDocumentElement from "@popperjs/core/lib/dom-utils/getDocumentElement";

@Component({
  selector: 'src-form-field-input',
  templateUrl: './form-field-input.component.html',
  styleUrls: ['./form-field-input.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class FormFieldInputComponent implements OnInit{
  @Input() field:any
  @Input() index:any
  @Input() submission:any
  @Input() entryIndex:any
  @Input() fieldEntry:any
  @Input() entry:any
  @Input() displayErrors: boolean;

  entryvalue: any = "";
  fieldFormVarName: string;
  input_entryIndex = ""

  initializeFormNames(){
    this.input_entryIndex = "input-"+this.entryIndex
  }

  ngOnInit(): void {
    this.fieldFormVarName = this.fieldUtilitiesService.fieldFormName(this.field.id + "$" + this.index);
    this.initializeFormNames();
  }

  constructor(public fieldUtilitiesService:FieldUtilitiesService) {
  }
}
