import {Component} from "@angular/core";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { AppDataService } from "@app/app-data.service";

@Component({
  selector: "src-disclaimer",
  templateUrl: "./disclaimer.component.html",
})
export class DisclaimerComponent {

  constructor(protected appDataService: AppDataService,private activeModal: NgbActiveModal, private modalService: NgbModal) {
  }

  confirmFunction: () => void;

  confirm() {
    this.confirmFunction();
    return this.activeModal.close();
  }

  cancel() {
    this.modalService.dismissAll();
  }
}
