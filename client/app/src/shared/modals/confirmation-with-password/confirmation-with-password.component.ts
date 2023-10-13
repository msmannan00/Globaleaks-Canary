import {Component} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "src-confirmation-with-password",
  templateUrl: "./confirmation-with-password.component.html"
})
export class ConfirmationWithPasswordComponent {
  confirmFunction: (secret: string) => void;
  secretModel: any;

  constructor(private activeModal: NgbActiveModal) {
  }

  dismiss() {
    this.activeModal.dismiss();
  }

  confirm() {
    this.confirmFunction(this.secretModel);
    return this.activeModal.close(this.secretModel);
  }
}
