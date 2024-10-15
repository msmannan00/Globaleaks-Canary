import {Component} from "@angular/core";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { NgClass, NgIf } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { TranslatorPipe } from "@app/shared/pipes/translate";

@Component({
    selector: 'src-reopen-submission',
    templateUrl: './reopen-submission.component.html',
    standalone: true,
    imports: [
        FormsModule,
        NgClass,
        NgIf,
        TranslateModule,
        TranslatorPipe,
    ],
})
export class ReopenSubmissionComponent {
  arg:{ motivation: string}={motivation: ""};
  constructor(private modalService: NgbModal, private activeModal: NgbActiveModal) {
  }
 
  confirmFunction: (motivation: string) => void;
  
    confirm(arg: string) {
      this.confirmFunction(arg);
      return this.activeModal.close(arg);
    }
  
    cancel() {
      this.modalService.dismissAll();
    }
}
