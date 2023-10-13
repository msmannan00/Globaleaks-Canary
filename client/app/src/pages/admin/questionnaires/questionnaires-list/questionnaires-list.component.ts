import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {NgForm} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DeleteConfirmationComponent} from "app/src/shared/modals/delete-confirmation/delete-confirmation.component";
import {
  QuestionnaireDuplicationComponent
} from "app/src/shared/modals/questionnaire-duplication/questionnaire-duplication.component";
import {HttpService} from "app/src/shared/services/http.service";
import {UtilsService} from "app/src/shared/services/utils.service";
import {QuestionnaireService} from "../questionnaire.service";

@Component({
  selector: "src-questionnaires-list",
  templateUrl: "./questionnaires-list.component.html"
})
export class QuestionnairesListComponent implements OnInit {
  @Input() questionnaire: any;
  @Input() editQuestionnaire: NgForm;
  showAddQuestion: boolean = false;
  editing: boolean = false;
  @Output() deleteRequestData = new EventEmitter<string>();

  constructor(private questionnariesService: QuestionnaireService, private modalService: NgbModal, private httpService: HttpService, private utilsService: UtilsService) {
  }

  ngOnInit(): void {
  }

  toggleAddQuestion(): void {
    this.showAddQuestion = !this.showAddQuestion;
  }

  toggleEditing(questionnaire: any) {
    this.editing = questionnaire.editable && !this.editing;
  }

  saveQuestionnaire(questionnaire: any) {
    this.httpService.requestUpdateAdminQuestionare(questionnaire.id, questionnaire).subscribe(_ => {
      this.editing = false;
      return this.questionnariesService.sendData();
    });
  }

  exportQuestionnaire(questionnaire: any) {
    this.utilsService.saveAs(questionnaire.name, "api/admin/questionnaires/" + questionnaire.id,);
  }

  duplicateQuestionnaire(questionnaire: any) {
    const modalRef = this.modalService.open(QuestionnaireDuplicationComponent);
    modalRef.componentInstance.questionnaire = questionnaire;
    modalRef.componentInstance.operation = "duplicate";
    return modalRef.result;
  }

  deleteQuestionnaire(questionnaire: any) {
    this.openConfirmableModalDialog(questionnaire, "");
  }

  openConfirmableModalDialog(arg: any, scope: any): Promise<any> {
    scope = !scope ? this : scope;
    const modalRef = this.modalService.open(DeleteConfirmationComponent);
    modalRef.componentInstance.arg = arg;
    modalRef.componentInstance.scope = scope;
    modalRef.componentInstance.confirmFunction = () => {
      return this.httpService.requestDeleteAdminQuestionare(arg.id).subscribe(_ => {
        return this.questionnariesService.sendData();
      });
    };
    return modalRef.result;
  }

}