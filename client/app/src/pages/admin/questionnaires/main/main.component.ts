import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { questionnaireResolverModel } from 'app/src/models/resolvers/questionnaireModel';
import { QuestionnairesResolver } from 'app/src/shared/resolvers/questionnaires.resolver';
import { HttpService } from 'app/src/shared/services/http.service';
import { UtilsService } from 'app/src/shared/services/utils.service';

@Component({
  selector: 'src-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  questionnairesData: any = []
  new_questionnaire: { name: string } = { name: '' };
  selectedEditingIndex: any
  showAddQuestionnaire: boolean = false;

  constructor(private http: HttpClient, private httpService: HttpService, private utilsService: UtilsService, private cdr: ChangeDetectorRef, public questionnaires: QuestionnairesResolver) { }
  ngOnInit(): void {
    this.questionnairesData = this.questionnaires.dataModel
    this.cdr.detectChanges();
  }

  add_questionnaire() {
    const questionnaire: questionnaireResolverModel = this.utilsService.new_questionnaire();
    questionnaire.name = this.new_questionnaire.name
    this.httpService.addQuestionare(questionnaire).subscribe(res => {
      this.questionnairesData.push(res);
      console.log(this.questionnairesData,"this.questionnairesData");
      
      this.new_questionnaire = { name: '' };
      this.cdr.markForCheck();
      this.utilsService.reloadCurrentRoute()

    })
  }
  toggleAddQuestionnaire(): void {
    this.showAddQuestionnaire = !this.showAddQuestionnaire;
  }

  importQuestionnaire(file: any) {
    this.utilsService.readFileAsText(file[0]).then((txt) => {
      return this.http.post('api/admin/questionnaires?multilang=1', txt).subscribe(() => {
        this.utilsService.reloadCurrentRoute()
      });
    })
    // .then(() => {
    //   this.reload();
    // })
    // .catch((error) => {
    //   this.Utils.displayErrorMsg(error);
    // });
  }
  // saveRequestData() { }
  deleteRequest(questionnaire: any) {
    if (questionnaire) {
      this.questionnairesData.splice(this.questionnairesData.indexOf(questionnaire), 1);
    }
    this.cdr.markForCheck();
    this.utilsService.reloadCurrentRoute()
  }
  trackByFn(index: number, item: questionnaireResolverModel) {
    return item.id; // Use a unique identifier for your items
}
}
