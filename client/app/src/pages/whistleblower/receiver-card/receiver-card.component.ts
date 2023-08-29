import {Component, Input} from '@angular/core';
import {SubmissionComponent} from "../submission/submission.component";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'src-receiver-card',
  templateUrl: './receiver-card.component.html',
  styleUrls: ['./receiver-card.component.css']
})
export class ReceiverCardComponent {
  @Input() submission:any
  @Input() receiver:any

  constructor(public translate: TranslateService) {
  }

}
