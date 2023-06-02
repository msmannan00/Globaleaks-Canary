import { Component } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'src-confirmation-with2fa',
  templateUrl: './confirmation-with2fa.component.html',
  styleUrls: ['./confirmation-with2fa.component.css']
})
export class ConfirmationWith2faComponent {
    secret: any;

    confirm(){
        this.activeModal.close(this.secret);
    }

    constructor(public activeModal: NgbActiveModal) {

    }
}
