import {Component, Input} from '@angular/core';
import {WbtipService} from "../../../services/wbtip.service";

@Component({
  selector: 'src-tip-field',
  templateUrl: './tip-field.component.html',
  styleUrls: ['./tip-field.component.css']
})
export class TipFieldComponent {
  @Input() fields: any;
  @Input() index: number;
  @Input() fieldAnswers:any

  preview: boolean = false;
  hasMultipleEntries(field_answer:any) {
    return field_answer.length > 1;
  };

  constructor(public wbtipService:WbtipService) {
  }

}
