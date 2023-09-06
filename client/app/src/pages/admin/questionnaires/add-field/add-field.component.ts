import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from 'app/src/shared/services/http.service';
import { UtilsService } from 'app/src/shared/services/utils.service';

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
      var field = this.utilsService.new_field(this.step.id, "");
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
      var field = this.utilsService.new_field_template(this.fields ? this.fields.id : "");
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
      var field = this.utilsService.new_field("", this.step.id);
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
