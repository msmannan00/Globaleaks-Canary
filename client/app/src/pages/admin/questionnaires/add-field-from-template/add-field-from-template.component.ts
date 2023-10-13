import {Component, EventEmitter, Input, Output} from "@angular/core";
import {NodeResolver} from "app/src/shared/resolvers/node.resolver";
import {HttpService} from "app/src/shared/services/http.service";
import {UtilsService} from "app/src/shared/services/utils.service";
import {new_field} from "@app/models/admin/new_field";
import {QuestionnaireService} from "../questionnaire.service";

@Component({
  selector: "src-add-field-from-template",
  templateUrl: "./add-field-from-template.component.html"
})
export class AddFieldFromTemplateComponent {
  @Input() fieldTemplatesData: any;
  @Input() step: any;
  @Input() type: any;
  @Output() dataToParent = new EventEmitter<string>();

  fields: any = [];
  new_field: any = {};

  constructor(private questionnariesService: QuestionnaireService, private nodeResolver: NodeResolver, private httpService: HttpService, private utilsService: UtilsService) {
    this.new_field = {
      template_id: ""
    };
  }

  ngOnInit(): void {
    if (this.step) {
      this.fields = this.step.children;
    }
  }

  add_field_from_template(): void {
    if (this.type === "step") {
      let field = new new_field();
      field.step_id = this.step.id;
      field.template_id = "";

      field.template_id = this.new_field.template_id;
      field.instance = "reference";
      field.y = this.utilsService.newItemOrder(this.fields, "y");
      this.httpService.requestAddAdminQuestionnaireField(field).subscribe((newField: any) => {
        this.fields.push(newField);
        this.new_field = {
          template_id: ""
        };
        this.dataToParent.emit();
        return this.questionnariesService.sendData();
      });
    }
    if (this.type === "field") {
      let field = new new_field();
      field.step_id = this.step.id;
      field.template_id = "";

      field.template_id = this.new_field.template_id;
      field.instance = "reference";
      field.y = this.utilsService.newItemOrder(this.step.children, "y");
      this.httpService.requestAddAdminQuestionnaireField(field).subscribe((newField: any) => {
        this.step.children.push(newField);
        this.new_field = {
          template_id: ""
        };
        this.dataToParent.emit();
        return this.questionnariesService.sendData();
      });
    }
  }
}