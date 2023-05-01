import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FieldUtilitiesService} from "../../../shared/services/field-utilities.service";
import {ControlContainer, NgForm} from "@angular/forms";

@Component({
  selector: 'src-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class FormComponent implements OnInit{
  @Input() step:any
  @Input() index:any
  @Input() answers:any
  @Input() submission:any
  @Input() displayErrors: boolean;

  fields: any;
  stepId: string;
  rows: any;
  status:any = {}


  initialize(){
    this.fields = this.step.children;
    this.stepId = "step-" + this.index;
    this.rows = this.fieldUtilitiesService.splitRows(this.fields);

    this.status = {
      opened: false,
    };
  }

  constructor(public fieldUtilitiesService:FieldUtilitiesService) {
  }

  ngOnInit(): void {
    this.initialize()
  }
  entryvalue: any;
}
