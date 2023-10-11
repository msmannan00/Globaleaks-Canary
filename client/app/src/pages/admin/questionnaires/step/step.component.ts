import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FieldtemplatesResolver } from 'app/src/shared/resolvers/fieldtemplates.resolver';
import { HttpService } from 'app/src/shared/services/http.service';
import { QuestionnariesService } from '../questionnaries.service';

@Component({
  selector: 'src-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class StepComponent implements OnInit {
  @Input() step: any;
  showAddQuestion: boolean = false;
  showAddQuestionFromTemplate: boolean = false;
  fieldtemplatesData: any = []
  constructor(public fieldtemplates: FieldtemplatesResolver, private httpService: HttpService,private questionnariesService: QuestionnariesService) { }
  ngOnInit(): void {
    this.fieldtemplatesData = this.fieldtemplates.dataModel
  }
  toggleAddQuestion(): void {
    this.showAddQuestion = !this.showAddQuestion;
    this.showAddQuestionFromTemplate = false;
  }

  toggleAddQuestionFromTemplate(): void {
    this.showAddQuestionFromTemplate = !this.showAddQuestionFromTemplate;
    this.showAddQuestion = false;
  }
  listenToAddField(data: any) {
    this.showAddQuestion = false
    // this.questionnariesService.sendData('');
  }
  listenToAddFieldFormTemplate(data: any) {
    this.showAddQuestionFromTemplate = false
    // this.questionnariesService.sendData('')
  }
}
