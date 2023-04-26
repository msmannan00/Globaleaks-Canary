import {Component, Input} from '@angular/core';
import {SubmissionComponent} from "../submission/submission.component";

@Component({
  selector: 'src-step-error',
  templateUrl: './step-error.component.html',
  styleUrls: ['./step-error.component.css']
})
export class StepErrorComponent {
  @Input() parent:SubmissionComponent
}
