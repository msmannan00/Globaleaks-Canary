import {Component} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "src-security-awareness-confidentiality",
  templateUrl: "./security-awareness-confidentiality.component.html",
})
export class SecurityAwarenessConfidentialityComponent {
  confirmFunction: () => void;

  constructor(private activeModal: NgbActiveModal) {
  }

  confirm() {
    this.confirmFunction();
    return this.activeModal.close();
  }
}
