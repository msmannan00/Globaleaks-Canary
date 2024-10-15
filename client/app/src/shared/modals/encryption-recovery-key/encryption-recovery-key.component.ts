import {Component, Input} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {UtilsService} from "@app/shared/services/utils.service";
import { TranslateModule } from "@ngx-translate/core";
import { TranslatorPipe } from "@app/shared/pipes/translate";

@Component({
    selector: "src-encryption-recovery-key",
    templateUrl: "./encryption-recovery-key.component.html",
    standalone: true,
    imports: [TranslateModule, TranslatorPipe]
})
export class EncryptionRecoveryKeyComponent {

  @Input() erk: string;

  constructor(private activeModal: NgbActiveModal, protected utilsService: UtilsService) {
  }

  dismiss() {
    this.activeModal.dismiss();
  }
}
