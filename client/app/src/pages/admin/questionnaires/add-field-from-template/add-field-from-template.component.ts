import { Component, Input } from '@angular/core';
import { FieldtemplatesResolver } from 'app/src/shared/resolvers/fieldtemplates.resolver';
import { NodeResolver } from 'app/src/shared/resolvers/node.resolver';
import { HttpService } from 'app/src/shared/services/http.service';
import { UtilsService } from 'app/src/shared/services/utils.service';
import {new_field} from "../../../../models/admin/new_field";

@Component({
  selector: 'src-add-field-from-template',
  templateUrl: './add-field-from-template.component.html',
  styleUrls: ['./add-field-from-template.component.css']
})
export class AddFieldFromTemplateComponent {
  @Input() fieldtemplatesData: any;
  @Input() step: any;
  @Input() type: any;
  fields: any = []
  new_field: any = {};
  constructor(public node: NodeResolver, private httpService: HttpService, private utilsService: UtilsService, public fieldtemplates: FieldtemplatesResolver) {
    this.new_field = {
      template_id: ''
    }
  }
  ngOnInit(): void {
    if (this.step) {
      this.fields = this.step.children
    }
  }
  add_field_from_template(): void {
    if (this.type === "step") {
      let field = new new_field()
      field.step_id = this.step.id
      field.template_id = ""

      field.template_id = this.new_field.template_id;
      field.instance = "reference";
      field.y = this.utilsService.newItemOrder(this.fields, "y");
      this.httpService.requestAddAdminQuestionnaireField(field).subscribe((newField: any) => {
        this.fields.push(newField);
        this.new_field = {
          template_id: ''
        };
      });
    }
    if (this.type === "field") {
      let field = new new_field()
      field.step_id = this.step.id
      field.template_id = ""

      field.template_id = this.new_field.template_id;
      field.instance = "reference";
      field.y = this.utilsService.newItemOrder(this.step.children, "y");
      this.httpService.requestAddAdminQuestionnaireField(field).subscribe((newField: any) => {
        this.step.children.push(newField);
        this.new_field = {
          template_id: ''
        };
      });
    }
  }

  toggleAddFieldFromTemplate() {
  }
}
