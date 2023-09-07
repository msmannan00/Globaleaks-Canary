import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'src-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {
  @Input() arg: any; // Input to receive argument for confirm action
  confirmFunction: (secret: string) => void;
  constructor(private modalService: NgbModal,public activeModal: NgbActiveModal){}
  confirm(arg: any) {
    this.confirmFunction(arg)
    return this.activeModal.close(arg);
  }
  cancel() {
    this.modalService.dismissAll();
  }
}
