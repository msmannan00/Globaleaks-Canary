import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {UtilsService} from "../../services/utils.service";

@Component({
  selector: 'src-encryption-recovery-key',
  templateUrl: './encryption-recovery-key.component.html',
  styleUrls: ['./encryption-recovery-key.component.css']
})
export class EncryptionRecoveryKeyComponent {

  @Input() erk:any

  constructor(public activeModal: NgbActiveModal, public utilsService:UtilsService) {
  }
}
