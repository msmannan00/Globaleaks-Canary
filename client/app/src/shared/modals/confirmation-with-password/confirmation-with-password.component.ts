import { Component, Input } from '@angular/core';
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'src-confirmation-with-password',
  templateUrl: './confirmation-with-password.component.html'
})
export class ConfirmationWithPasswordComponent {
  confirmFunction: (secret: string) => void;
  secretModel: any;
  constructor(public activeModal: NgbActiveModal) { }
  confirm() {
    this.confirmFunction(this.secretModel)
    return this.activeModal.close(this.secretModel);
  }

}
