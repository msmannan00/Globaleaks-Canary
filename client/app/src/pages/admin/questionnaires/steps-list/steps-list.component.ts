import {HttpClient} from "@angular/common/http";
import {Component, Input} from "@angular/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DeleteConfirmationComponent} from "app/src/shared/modals/delete-confirmation/delete-confirmation.component";
import {NodeResolver} from "app/src/shared/resolvers/node.resolver";
import {FieldUtilitiesService} from "app/src/shared/services/field-utilities.service";
import {HttpService} from "app/src/shared/services/http.service";
import {QuestionnaireService} from "../questionnaire.service";

@Component({
  selector: "src-steps-list",
  templateUrl: "./steps-list.component.html"
})
export class StepsListComponent {
  @Input() step: any;
  @Input() questionnaire: any;
  @Input() index: any;
  editing: boolean = false;
  showAddTrigger: boolean = false;
  new_step: { label: string } = {label: ""};
  parsedFields: any;
  new_trigger: { field: string; option: string; sufficient: boolean } = {
    field: "",
    option: "",
    sufficient: true,
  };

  constructor(private questionnaireService: QuestionnaireService, private modalService: NgbModal, private fieldUtilities: FieldUtilitiesService, protected nodeResolver: NodeResolver, private httpClient: HttpClient, private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.parsedFields = this.fieldUtilities.parseQuestionnaire(this.questionnaire, {});
  }

  swap($event: any, index: number, n: number): void {
    $event.stopPropagation();

    const target = index + n;
    if (target < 0 || target >= this.questionnaire.steps.length) {
      return;
    }

    [this.questionnaire.steps[index], this.questionnaire.steps[target]] =
      [this.questionnaire.steps[target], this.questionnaire.steps[index]];

    this.httpClient.put("/api/admin/steps", {
      operation: "order_elements",
      args: {
        ids: this.questionnaire.steps.map((c: { id: any; }) => c.id),
        questionnaire_id: this.questionnaire.id
      },
    }).subscribe();
  }

  moveUp(e: any, idx: number): void {
    this.swap(e, idx, -1);
  }

  moveDown(e: any, idx: number): void {
    this.swap(e, idx, 1);
  }

  toggleEditing() {
    this.editing = !this.editing;
  }

  toggleAddTrigger() {
    this.showAddTrigger = !this.showAddTrigger;
  }

  saveStep(step: any) {
    return this.httpService.requestUpdateAdminQuestionnaireStep(step.id, step).subscribe(_ => {
      return this.questionnaireService.sendData();
    });
  }

  deleteStep(step: any) {
    this.openConfirmableModalDialog(step, "");

  }

  openConfirmableModalDialog(arg: any, scope: any): Promise<any> {
    scope = !scope ? this : scope;
    const modalRef = this.modalService.open(DeleteConfirmationComponent);
    modalRef.componentInstance.arg = arg;
    modalRef.componentInstance.scope = scope;
    modalRef.componentInstance.confirmFunction = () => {
      return this.httpService.requestDeleteAdminQuestionareStep(arg.id).subscribe(_ => {
        return this.questionnaireService.sendData();
      });
    };
    return modalRef.result;
  }

  addTrigger() {
    this.step.triggered_by_options.push(this.new_trigger);
    this.toggleAddTrigger();
    this.new_trigger = {"field": "", "option": "", "sufficient": true};
  }

  delTrigger(trigger: any) {
    const index = this.step.triggered_by_options.indexOf(trigger);
    if (index !== -1) {
      this.step.triggered_by_options.splice(index, 1);
    }
  }
}