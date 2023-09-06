import { Component, Input, OnInit } from '@angular/core';
import { FieldtemplatesResolver } from 'app/src/shared/resolvers/fieldtemplates.resolver';

@Component({
  selector: 'src-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class StepComponent implements OnInit{
  @Input() step: any;
  showAddQuestion: boolean = false;
  showAddQuestionFromTemplate: boolean = false;
  fieldtemplatesData: any = []
  constructor(public fieldtemplates: FieldtemplatesResolver) { }
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

}
