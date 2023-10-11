import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'src-security-awareness-confidentiality',
  templateUrl: './security-awareness-confidentiality.component.html',
})
export class SecurityAwarenessConfidentialityComponent {
  confirmFunction: () => void;
  constructor(private activeModal: NgbActiveModal, private modalService: NgbModal) {
  }
  confirm() {
    this.confirmFunction()
    return this.activeModal.close();
  }
}
