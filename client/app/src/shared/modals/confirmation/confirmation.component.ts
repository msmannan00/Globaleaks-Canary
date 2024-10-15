import {Component, Input} from "@angular/core";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { TranslatorPipe } from "@app/shared/pipes/translate";

@Component({
    selector: "src-confirmation",
    templateUrl: "./confirmation.component.html",
    standalone: true,
    imports: [TranslateModule, TranslatorPipe]
})
export class ConfirmationComponent {
  @Input() arg: string;

  constructor(private modalService: NgbModal, private activeModal: NgbActiveModal) {
  }

  confirmFunction: (secret: string) => void;

  confirm(arg: string) {
    this.confirmFunction(arg);
    return this.activeModal.close(arg);
  }

  cancel() {
    this.modalService.dismissAll();
  }
}
