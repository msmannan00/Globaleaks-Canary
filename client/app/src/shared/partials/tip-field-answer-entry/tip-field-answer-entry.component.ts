import {Component, Input} from '@angular/core';

@Component({
  selector: 'src-tip-field-answer-entry',
  templateUrl: './tip-field-answer-entry.component.html',
  styleUrls: ['./tip-field-answer-entry.component.css']
})
export class TipFieldAnswerEntryComponent {
  @Input() entry:any
  @Input() field:any

  format = 'dd/MM/yyyy';
  locale = 'en-US';
  myDate = 'Tue Feb 05 2019 00:00:00 GMT+0530 (India Standard Time)';

}
