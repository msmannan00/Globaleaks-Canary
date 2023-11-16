import {Component, OnInit} from "@angular/core";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NodeResolver} from "@app/shared/resolvers/node.resolver";
import {AppDataService} from "@app/app-data.service";

@Component({
  selector: "src-disclaimer",
  templateUrl: "./disclaimer.component.html",
})
export class DisclaimerComponent implements OnInit {
  nodeData: any = [];

  constructor(private activeModal: NgbActiveModal, private modalService: NgbModal, protected appDataService: AppDataService) {
  }

  confirmFunction: () => void;

  ngOnInit(): void {
    if (this.appDataService.public.node) {
      this.nodeData = this.appDataService.public.node;
    }
  }

  confirm() {
    this.confirmFunction();
    return this.activeModal.close();
  }

  cancel() {
    this.modalService.dismissAll();
  }
}
