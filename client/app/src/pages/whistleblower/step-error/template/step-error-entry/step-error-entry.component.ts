import {Component, Input} from '@angular/core';
import {SubmissionComponent} from "../../../submission/submission.component";

@Component({
  selector: 'src-step-error-entry',
  templateUrl: './step-error-entry.component.html',
  styleUrls: ['./step-error-entry.component.css']
})
export class StepErrorEntryComponent {
  @Input() parent:SubmissionComponent
  @Input() err:any

  pre = "fieldForm_";
  f_id:any
  field:any


  goToQuestion() {
    let form = document.getElementById("step-" + this.parent.navigation);
    let s = "div[data-ng-form=\"" + this.err.$name + "\"] .ng-invalid";
    if(form){
      let formFieldSel:any = form.querySelector(s);
      formFieldSel.focus();
    }
  }

  initlialize(){
    this.f_id =  this.err.name;
    this.f_id = this.f_id.substring(0, this.f_id.indexOf("$"));
    this.f_id = this.f_id.slice(this.pre.length).replace(new RegExp("_", "g"), "-");
    this.field = this.parent.field_id_map[this.f_id];
  }

  constructor() {
    this.initlialize();
  }
}
