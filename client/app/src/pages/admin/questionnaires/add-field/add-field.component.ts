import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from 'app/src/shared/services/http.service';
import { UtilsService } from 'app/src/shared/services/utils.service';
import {new_step} from "../../../../models/admin/fieldTemplate";

@Component({
  selector: 'src-add-field',
  templateUrl: './add-field.component.html',
  styleUrls: ['./add-field.component.css']
})
export class AddFieldComponent implements OnInit {
  @Input() step: any
  @Input() type: any;
  new_field: any = {};
  fields: any

  constructor(private httpService: HttpService, private utilsService: UtilsService) {
    this.new_field = {
      label: '',
      type: ''
    };
  }
  ngOnInit(): void {
    if (this.step) {
      this.fields = this.step.children
    }
    console.log(this.fields, "this.fields");

  }
  add_field() {
    if (this.type === "step") {
      let field = new new_step()
      field.step_id = this.step.id
      field.fieldgroup_id = ""

      field.label = this.new_field.label,
      field.type = this.new_field.type,
      field.y = this.utilsService.newItemOrder(this.fields, "y");
      if (field.type === 'fileupload') {
        field.multi_entry = true;
      }
      this.httpService.requestAddAdminQuestionnaireField(field).subscribe((newField: any) => {
        this.fields.push(newField);
        this.new_field = {
          label: '',
          type: ''
        };
      });
    }
    if (this.type === "template") {
      let fieldid = this.fields ? this.fields.id : ""
      let field:new_step = new new_step();
      field.fieldgroup_id = fieldid
      field.instance = "template";
      field.label = this.new_field.label;
      field.type = this.new_field.type;
      this.httpService.requestAddAdminQuestionnaireFieldTemplate(field).subscribe((newField: any) => {
        // this.fields.push(newField);
        this.new_field = {
          label: '',
          type: ''
        };
      });
    }
    if (this.type === "field") {
      let field = new new_step()
      field.step_id = this.step.id
      field.fieldgroup_id = ""
      field.label = this.new_field.label,
      field.type = this.new_field.type,
      field.y = this.utilsService.newItemOrder(this.step.children, "y");
      if (field.type === 'fileupload') {
        field.multi_entry = true;
      }
      field.instance = this.step.instance;
      this.httpService.requestAddAdminQuestionnaireField(field).subscribe((newField: any) => {
        this.step.children.push(newField);
        this.new_field = {
          label: '',
          type: ''
        };
      });
    }
  }
  toggleAddQuestion() {
    // Implement your logic to toggle the "Add Question" form visibility
  }
}
