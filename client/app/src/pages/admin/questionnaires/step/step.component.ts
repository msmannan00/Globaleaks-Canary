import {Component, Input, OnInit} from "@angular/core";
import {FieldtemplatesResolver} from "app/src/shared/resolvers/fieldtemplates.resolver";

@Component({
  selector: "src-step",
  templateUrl: "./step.component.html"
})
export class StepComponent implements OnInit {
  @Input() step: any;
  showAddQuestion: boolean = false;
  showAddQuestionFromTemplate: boolean = false;
  fieldTemplatesData: any = [];

  constructor(public fieldTemplates: FieldtemplatesResolver) {
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