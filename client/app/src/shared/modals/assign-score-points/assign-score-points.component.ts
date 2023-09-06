import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersResolver } from '../../resolvers/users.resolver';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'src-assign-score-points',
  templateUrl: './assign-score-points.component.html',
  styleUrls: ['./assign-score-points.component.css']
})
export class AssignScorePointsComponent {
  @Input() arg: any
  confirmFunction: (data: any) => void;
  constructor(public utilsService: UtilsService, public users: UsersResolver, public activeModal: NgbActiveModal, private modalService: NgbModal) { }
  confirm() {
    this.confirmFunction(this.arg)
    return this.activeModal.close(this.arg);
  }
  cancel() {
    this.modalService.dismissAll();
  }
}
