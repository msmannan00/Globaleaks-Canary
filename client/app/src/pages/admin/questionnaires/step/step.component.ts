import {Component, Input, OnInit} from "@angular/core";
import {FieldTemplatesResolver} from "@app/shared/resolvers/field-templates-resolver.service";

@Component({
  selector: "src-step",
  templateUrl: "./step.component.html"
})
export class StepComponent implements OnInit {
  @Input() step: any;
  showAddQuestion: boolean = false;
  showAddQuestionFromTemplate: boolean = false;
  fieldTemplatesData: any = [];

  constructor(public fieldTemplates: FieldTemplatesResolver) {
  }

  ngOnInit(): void {
    this.fieldTemplatesData = this.fieldTemplates.dataModel;
  }

  toggleAddQuestion(): void {
    this.showAddQuestion = !this.showAddQuestion;
    this.showAddQuestionFromTemplate = false;
  }

  toggleAddQuestionFromTemplate(): void {
    this.showAddQuestionFromTemplate = !this.showAddQuestionFromTemplate;
    this.showAddQuestion = false;
  }

  listenToAddField() {
    this.showAddQuestion = false;
  }

  listenToAddFieldFormTemplate() {
    this.showAddQuestionFromTemplate = false;
  }
}