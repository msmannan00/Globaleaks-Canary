import {Component, Input} from "@angular/core";
import {AuthenticationService} from "@app/services/authentication.service";

@Component({
  selector: "src-tip-field-answer-entry",
  templateUrl: "./tip-field-answer-entry.component.html"
})
export class TipFieldAnswerEntryComponent {
  @Input() entry: any;
  @Input() field: any;
  @Input() fieldAnswers: any;
  audioList: any;
  format = "dd/MM/yyyy";
  locale = "en-US";

  constructor(protected authenticationService: AuthenticationService) {
  }
}
