import {Component, Input} from "@angular/core";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "src-assign-score-points",
  templateUrl: "./assign-score-points.component.html"
})
export class AssignScorePointsComponent {
  @Input() arg = {
    score_points: 0,
    score_type: 0
  };

  confirmFunction: (data: any) => void;

  constructor(private activeModal: NgbActiveModal, private modalService: NgbModal) {
  }

  confirm() {
    this.confirmFunction(this.arg);
    return this.activeModal.close(this.arg);
  }

  cancel() {
    this.modalService.dismissAll();
  }
}
