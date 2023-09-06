import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'src-add-option-hint',
  templateUrl: './add-option-hint.component.html',
  styleUrls: ['./add-option-hint.component.css']
})
export class AddOptionHintComponent {
  confirmFunction: (data: any) => void;
  @Input() arg: any;
  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal) { }
  confirm() {
    this.confirmFunction(this.arg)
    return this.activeModal.close(this.arg);
  }
  cancel() {
    this.modalService.dismissAll();
  }

}
