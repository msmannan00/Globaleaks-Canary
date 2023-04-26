import {Component, Input} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'src-submission-error',
  templateUrl: './submission-error.component.html',
  styleUrls: ['./submission-error.component.css']
})
export class SubmissionErrorComponent {

  @Input() submissionForm: NgForm

}
