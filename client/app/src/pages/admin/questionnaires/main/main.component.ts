import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { questionnaireResolverModel } from 'app/src/models/resolvers/questionnaireModel';
import { QuestionnairesResolver } from 'app/src/shared/resolvers/questionnaires.resolver';
import { HttpService } from 'app/src/shared/services/http.service';
import { UtilsService } from 'app/src/shared/services/utils.service';
import { new_questionare } from "../../../../models/admin/new_questionare";
import { QuestionnariesService } from '../questionnaries.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'src-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {

  questionnairesData: any = []
  new_questionnaire: { name: string } = { name: '' };
  selectedEditingIndex: any
  showAddQuestionnaire: boolean = false;
  private destroy$ = new Subject<void>();
  constructor(private http: HttpClient, private questionnariesService: QuestionnariesService, private httpService: HttpService, private utilsService: UtilsService, private cdr: ChangeDetectorRef, public questionnaires: QuestionnairesResolver) { }
  ngOnInit(): void {
    this.questionnariesService.getData().pipe(takeUntil(this.destroy$)).subscribe(() => {
      return this.getResolver()
    });
    this.questionnairesData = this.questionnaires.dataModel
    this.cdr.markForCheck();
  }

  add_questionnaire() {
    const questionnaire: new_questionare = new new_questionare();
    questionnaire.name = this.new_questionnaire.name
    this.httpService.addQuestionare(questionnaire).subscribe(res => {
      this.questionnairesData.push(res);
      this.new_questionnaire = { name: '' };
      this.getResolver()
      this.cdr.markForCheck();
      // this.utilsService.reloadCurrentRoute()

    })
  }
  toggleAddQuestionnaire(): void {
    this.showAddQuestionnaire = !this.showAddQuestionnaire;
  }

  importQuestionnaire(file: any) {
    this.utilsService.readFileAsText(file[0]).then((txt) => {
      return this.http.post('api/admin/questionnaires?multilang=1', txt).subscribe(() => {
        this.getResolver()
        // this.utilsService.reloadCurrentRoute()
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
    this.getResolver()
    this.cdr.markForCheck();
    // this.utilsService.reloadCurrentRoute()
  }
  listenToQuestionnairesList(data: any) {
    // this.getResolver()
  }
  getResolver() {
    return this.httpService.requestQuestionnairesResource().subscribe(response => {
      this.questionnaires.dataModel = response
      this.questionnairesData = response
      this.cdr.markForCheck();
    })
  }
  trackByFn(index: number, item: questionnaireResolverModel) {
    return item.id; // Use a unique identifier for your items
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
