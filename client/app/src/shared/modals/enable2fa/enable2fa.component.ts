import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {UtilsService} from "../../services/utils.service";
import {PreferenceResolver} from "../../resolvers/preference.resolver";
import {TwofactorauthData} from "../../../services/2fa.data.service";
import {EncryptionRecoveryKeyComponent} from "../encryption-recovery-key/encryption-recovery-key.component";

@Component({
  selector: 'src-enable2fa',
  templateUrl: './enable2fa.component.html',
  styleUrls: ['./enable2fa.component.css']
})
export class Enable2faComponent {
  confirm() {
    let requestObservable = this.utilsService.runUserOperation("enable_2fa", {"secret": this.twofactorauthData.totp.secret,"token": this.twofactorauthData.totp.token }, true);
    requestObservable.subscribe(
        {
          next: response => {
            this.preferenceResolver.dataModel.two_factor = true;
            this.activeModal.dismiss()
          },
          error: (error: any) => {
            this.utilsService.reloadCurrentRoute()
          }
        }
    );
  }

  constructor(public twofactorauthData:TwofactorauthData, private preferenceResolver:PreferenceResolver,public activeModal: NgbActiveModal, private utilsService:UtilsService) {
  }
}
