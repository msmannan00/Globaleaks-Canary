import {Component, Input} from "@angular/core";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { TranslatorPipe } from "@app/shared/pipes/translate";

@Component({
    selector: "src-assign-score-points",
    templateUrl: "./assign-score-points.component.html",
    standalone: true,
    imports: [FormsModule, NgIf, TranslateModule, TranslatorPipe]
})
export class AssignScorePointsComponent {
  @Input() arg = {
    score_points: 0,
    score_type: 'addition'
  };

  constructor(private activeModal: NgbActiveModal, private modalService: NgbModal) {
  }

  confirmFunction: (data: { score_points: number, score_type: string }) => void;

  confirm() {
    this.confirmFunction(this.arg);
    return this.activeModal.close(this.arg);
  }

  cancel() {
    this.modalService.dismissAll();
  }
}
