import {Component, Input} from '@angular/core';
import {SubmissionComponent} from "../submission/submission.component";

@Component({
  selector: 'src-receiver-card',
  templateUrl: './receiver-card.component.html',
  styleUrls: ['./receiver-card.component.css']
})
export class ReceiverCardComponent {
  @Input() submission:any
  @Input() receiver:any

}
