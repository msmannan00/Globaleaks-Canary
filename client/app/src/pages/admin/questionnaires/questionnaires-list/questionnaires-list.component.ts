import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppDataService } from 'app/src/app-data.service';
import { AppConfigService } from 'app/src/services/app-config.service';
import { DeleteConfirmationComponent } from 'app/src/shared/modals/delete-confirmation/delete-confirmation.component';
import { QuestionnaireDuplicationComponent } from 'app/src/shared/modals/questionnaire-duplication/questionnaire-duplication.component';
import { HttpService } from 'app/src/shared/services/http.service';
import { UtilsService } from 'app/src/shared/services/utils.service';

@Component({
  selector: 'src-questionnaires-list',
  templateUrl: './questionnaires-list.component.html',
  styleUrls: ['./questionnaires-list.component.css']
})
export class QuestionnairesListComponent {
  @Input() questionnaire: any;
  @Input() editQuestionnaire: NgForm;
  showAddQuestion: boolean = false;
  editing: boolean = false;
  @Output() deleteRequestData = new EventEmitter<string>();
  // @Output() saveRequestData = new EventEmitter<string>();
  constructor(private http: HttpClient, public appConfigService: AppConfigService, public appDataService: AppDataService, public modalService: NgbModal, private httpService: HttpService, private utilsService: UtilsService) { }

  toggleAddQuestion(): void {
    this.showAddQuestion = !this.showAddQuestion;
  }
  toggleEditing(questionnaire: any) {
    this.editing = questionnaire.editable && !this.editing;
  }

  saveQuestionnaire(questionnaire: any) {
    console.log(questionnaire, "questionnaire");
    this.httpService.requestUpdateAdminQuestionare(questionnaire.id, questionnaire).subscribe(res => {
      // this.saveRequestData.emit(res);
      this.editing = false;
    })
  }

  exportQuestionnaire(questionnaire: any) {
    this.utilsService.saveAs(questionnaire.name, 'api/admin/questionnaires/' + questionnaire.id,);
  }

  duplicateQuestionnaire(questionnaire: any) {
    const modalRef = this.modalService.open(QuestionnaireDuplicationComponent);
    modalRef.componentInstance.questionnaire = questionnaire;
    modalRef.componentInstance.operation = 'duplicate';
    return modalRef.result;
  }

  deleteQuestionnaire(questionnaire: any) {
    this.openConfirmableModalDialog(questionnaire, "")
  }
  openConfirmableModalDialog(arg: any, scope: any): Promise<any> {
    scope = !scope ? this : scope;
    const modalRef = this.modalService.open(DeleteConfirmationComponent);
    modalRef.componentInstance.arg = arg;
    modalRef.componentInstance.scope = scope;
    modalRef.componentInstance.confirmFunction = () => {
      return this.httpService.requestDeleteAdminQuestionare(arg.id).subscribe(res => {
        this.deleteRequestData.emit(this.questionnaire);
      });
    };
    return modalRef.result;
  }
  
}
