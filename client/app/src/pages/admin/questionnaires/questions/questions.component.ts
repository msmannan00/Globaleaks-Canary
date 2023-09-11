import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FieldtemplatesResolver } from 'app/src/shared/resolvers/fieldtemplates.resolver';
import { QuestionnairesResolver } from 'app/src/shared/resolvers/questionnaires.resolver';
import { HttpService } from 'app/src/shared/services/http.service';
import { UtilsService } from 'app/src/shared/services/utils.service';

@Component({
  selector: 'src-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent {
  showAddQuestion: boolean = false
  fields: any
  questionnairesData: any = []
  step: any
  constructor(private http: HttpClient, private httpService: HttpService, private utilsService: UtilsService, public fieldtemplates: FieldtemplatesResolver, public questionnaires: QuestionnairesResolver
  ) { }
  ngOnInit(): void {
    this.questionnairesData = this.questionnaires.dataModel
    // this.step = this.questionnairesData.steps[0]
    this.fields = this.fieldtemplates.dataModel
    this.fields = this.fields.filter((field: { editable: boolean; }) => field.editable === true);

  }
  toggleAddQuestion() {
    this.showAddQuestion = !this.showAddQuestion;
  };

  importQuestion(file: any): void {
    this.utilsService.readFileAsText(file[0]).then((txt) => {
      return this.http.post('api/admin/fieldtemplates?multilang=1', txt).subscribe(() => {
        this.utilsService.reloadCurrentRoute()
      });
    })
    //   .catch(error => {
    //     this.Utils.displayErrorMsg(error);
    //   });
  }

}
