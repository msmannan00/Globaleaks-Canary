import {Component, Input, OnInit} from "@angular/core";
import {NodeResolver} from "@app/shared/resolvers/node.resolver";
import {HttpService} from "@app/shared/services/http.service";
import {UtilsService} from "@app/shared/services/utils.service";
import {NewStep} from "@app/models/admin/new-step";
import {QuestionnaireService} from "@app/pages/admin/questionnaires/questionnaire.service";
import {Step, questionnaireResolverModel} from "@app/models/resolvers/questionnaire-model";
import { NgIf, NgFor } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { StepsListComponent } from "../steps-list/steps-list.component";
import { TranslatorPipe } from "@app/shared/pipes/translate";
import { TranslateModule } from "@ngx-translate/core";

@Component({
    selector: "src-steps",
    templateUrl: "./steps.component.html",
    standalone: true,
    imports: [NgIf, FormsModule, NgFor, StepsListComponent, TranslatorPipe, TranslateModule]
})
export class StepsComponent implements OnInit {
  @Input() questionnaire: questionnaireResolverModel;
  showAddStep: boolean = false;
  step: Step;
  editing: boolean = false;
  new_step: { label: string } = {label: ""};

  constructor(private questionnaireService: QuestionnaireService, protected node: NodeResolver, protected utilsService: UtilsService, private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.step = this.questionnaire.steps[0];
  }

  toggleAddStep() {
    this.showAddStep = !this.showAddStep;
  }

  addStep() {
    const step = new NewStep();
    step.questionnaire_id = this.questionnaire.id;
    step.label = this.new_step.label;
    step.order = this.utilsService.newItemOrder(this.questionnaire.steps, "order");

    this.httpService.requestAddAdminQuestionnaireStep(step).subscribe(() => {
      this.new_step = {label: ""};
      return this.questionnaireService.sendData();

    });
  }
}