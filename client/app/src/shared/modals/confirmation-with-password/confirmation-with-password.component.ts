import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'src-confirmation-with-password',
  templateUrl: './confirmation-with-password.component.html',
  styleUrls: ['./confirmation-with-password.component.css']
})
export class ConfirmationWithPasswordComponent {

  secretModel:any;
  constructor(public activeModal: NgbActiveModal) {
  }

  confirm(){
    this.activeModal.close(this.secretModel);
  }

}
