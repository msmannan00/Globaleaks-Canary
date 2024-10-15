import {Component} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { TranslatorPipe } from "@app/shared/pipes/translate";

@Component({
    selector: "src-enable-encryption",
    templateUrl: "./enable-encryption.component.html",
    standalone: true,
    imports: [TranslateModule, TranslatorPipe]
})
export class EnableEncryptionComponent {
  constructor(protected activeModal: NgbActiveModal) {
  }

  confirm() {
    this.activeModal.close();
  }

  cancel() {
    return this.activeModal.close();
  }
}
