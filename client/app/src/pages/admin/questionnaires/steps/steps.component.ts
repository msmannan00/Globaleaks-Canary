import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NodeResolver } from 'app/src/shared/resolvers/node.resolver';
import { FieldUtilitiesService } from 'app/src/shared/services/field-utilities.service';
import { HttpService } from 'app/src/shared/services/http.service';
import { UtilsService } from 'app/src/shared/services/utils.service';

@Component({
  selector: 'src-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {
  @Input() questionnaire: any;
  showAddStep: boolean = false;
  step: any
  editing: boolean = false
  showAddTrigger: boolean = false
  new_step: { label: string } = { label: '' };
  parsedFields: any
  new_trigger: { field: string; option: string; sufficient: boolean } = {
    field: "",
    option: "",
    sufficient: true,
  };
  constructor(private fieldUtilities: FieldUtilitiesService, public node: NodeResolver, private http: HttpClient, public utilsService: UtilsService, private httpService: HttpService) { }

  ngOnInit(): void {
    this.step = this.questionnaire.steps[0]
    this.parsedFields = this.fieldUtilities.parseQuestionnaire(this.questionnaire, {});

  }
  toggleAddStep() {
    this.showAddStep = !this.showAddStep;
  }

  add_step() {
    console.log(this.questionnaire, "this.questionnaire");

    const step = this.utilsService.new_step(this.questionnaire.id);
    step.label = this.new_step.label,
    step.order = this.utilsService.newItemOrder(this.questionnaire.steps, "order")
    this.httpService.requestAddAdminQuestionnaireStep(step).subscribe((new_step: any) => {
      this.questionnaire.steps.push(new_step);
      this.new_step = { label: '' };
    });
  }

  swap($event: any, index: number, n: number): void {
    $event.stopPropagation();

    const target = index + n;
    if (target < 0 || target >= this.questionnaire.steps.length) {
      return;
    }

    [this.questionnaire.steps[index], this.questionnaire.steps[target]] =
      [this.questionnaire.steps[target], this.questionnaire.steps[index]];

    this.http.put("api/admin/steps", {
      operation: "order_elements",
      args: {
        ids: this.questionnaire.steps.map((c: { id: any; }) => c.id),
        questionnaire_id: this.questionnaire.id
      },
    }).subscribe(
      response => {
        // Handle the response if needed
      },

    );
  }
  moveUp(e: any, idx: number): void {
    this.swap(e, idx, -1);
  }

  moveDown(e: any, idx: number): void {
    this.swap(e, idx, 1);
  }

  toggleEditing() {
    this.editing = !this.editing
  }

  toggleAddTrigger() {
    this.showAddTrigger = !this.showAddTrigger
  }
  addTrigger() {
    this.step.triggered_by_options.push(this.new_trigger);
    this.toggleAddTrigger();
    this.new_trigger = { "field": "", "option": "", "sufficient": true };
  }
  delTrigger(trigger: any) {
    const index = this.step.triggered_by_options.indexOf(trigger);
    if (index !== -1) {
      this.step.triggered_by_options.splice(index, 1);
    }
  }
}
