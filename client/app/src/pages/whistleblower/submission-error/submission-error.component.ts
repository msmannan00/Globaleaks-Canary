import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {UtilsService} from "../../../shared/services/utils.service";
import {SubmissionService} from "../../../services/submission.service";

@Component({
  selector: 'src-submission-error',
  templateUrl: './submission-error.component.html',
  styleUrls: ['./submission-error.component.css']
})
export class SubmissionErrorComponent {

  @Input() submissionForm: NgForm
  @Input() hasPreviousStep: boolean
  @Input() show_steps_navigation_interface: boolean
  @Input() hasNextStep: boolean
  @Input() areRecieverSelected: boolean
  @Input() singlestepform: boolean
  @Input() context: any
  @Input() navigation: number;
  @Input() uploads: number;
  @Input() submission: SubmissionService;
  @Input() stepforms: any;
  @Input() field_id_map: any;

  @Input() displayStepErrors: Function;
  @Input() stepform: Function;

  @Output() goToStep: EventEmitter<any> = new EventEmitter();

  constructor(public utilsService:UtilsService) {
  }

}
