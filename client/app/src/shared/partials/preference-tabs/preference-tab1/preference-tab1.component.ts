import {Component, OnInit} from "@angular/core";
import {PreferenceResolver} from "@app/shared/resolvers/preference.resolver";
import {UtilsService} from "@app/shared/services/utils.service";
import {AuthenticationService} from "@app/services/authentication.service";
import {AppDataService} from "@app/app-data.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Enable2faComponent} from "@app/shared/modals/enable2fa/enable2fa.component";
import {TwoFactorAuthData} from "@app/services/2fa.data.service";
import {HttpService} from "@app/shared/services/http.service";
import {ConfirmationWithPasswordComponent} from "@app/shared/modals/confirmation-with-password/confirmation-with-password.component";
import {EncryptionRecoveryKeyComponent} from "@app/shared/modals/encryption-recovery-key/encryption-recovery-key.component";
import {TranslationService} from "@app/services/translation.service";
import {TranslateService} from "@ngx-translate/core";
import {ConfirmationWith2faComponent} from "@app/shared/modals/confirmation-with2fa/confirmation-with2fa.component";

@Component({
  selector: "src-preference-tab1",
  templateUrl: "./preference-tab1.component.html"
})
export class PreferenceTab1Component implements OnInit {

  editingName: boolean;
  editingPublicName: boolean;
  editingEmailAddress: boolean;
  languageModel = "";
  role = "";

  constructor(private translationService: TranslationService, private translateService: TranslateService, private httpService: HttpService, private twoFactorAuthData: TwoFactorAuthData, private modalService: NgbModal, public appDataService: AppDataService, protected preferenceResolver: PreferenceResolver, private utilsService: UtilsService, protected authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.role = this.utilsService.role_l10n(this.authenticationService.session.role);
    this.role = this.translateService.instant(this.role);
    setTimeout(() => {
      this.languageModel = this.preferenceResolver.dataModel.language;
    }, 150);
  }

  toggleNameEditing() {
    this.editingName = !this.editingName;
  };

  togglePublicNameEditing() {
    this.editingPublicName = !this.editingPublicName;
  };

  toggleEmailAddressEditing() {
    this.editingEmailAddress = !this.editingEmailAddress;
  };

  toggle2FA(event: Event) {
    if (!this.preferenceResolver.dataModel.two_factor) {
      let array = new Uint32Array(32);

      window.crypto.getRandomValues(array);

      this.twoFactorAuthData.totp.secret = "";
      this.twoFactorAuthData.totp.qrcode_string = "";
      this.twoFactorAuthData.totp.edit = false;

      this.modalService.open(Enable2faComponent);

    } else {
      let modalRef = this.modalService.open(ConfirmationWith2faComponent);
      modalRef.result.then(
        (result) => {
          let data = {
            "operation": "disable_2fa",
            "args": {
              "secret": result,
              "token": this.twoFactorAuthData.totp.token
            }
          };

          this.httpService.requestOperationsRecovery(data, this.utilsService.encodeString(result)).subscribe(
            {
              next: _ => {
                this.preferenceResolver.dataModel.two_factor = !this.preferenceResolver.dataModel.two_factor;
                this.utilsService.reloadCurrentRoute();
              },
              error: (_: any) => {
                this.utilsService.reloadCurrentRoute();
              }
            }
          );
        },
        (_) => {
        }
      );
    }

    event.preventDefault();
    return false;
  }

  getEncryptionRecoveryKey() {

    let modalRef = this.modalService.open(ConfirmationWithPasswordComponent);
    modalRef.componentInstance.confirmFunction = (result: any) => {
      let data = {
        "operation": "get_recovery_key",
        "args": {
          "secret": this.twoFactorAuthData.totp.secret,
          "token": this.twoFactorAuthData.totp.token
        }
      };

      let requestObservable = this.httpService.requestOperationsRecovery(data, this.utilsService.encodeString(result));
      requestObservable.subscribe(
        {
          next: response => {
            this.preferenceResolver.dataModel.clicked_recovery_key = true;
            let erk = response.data["text"].match(/.{1,4}/g).join("-");
            let modalRef = this.modalService.open(EncryptionRecoveryKeyComponent);
            modalRef.componentInstance.erk = erk;
          },
          error: (error: any) => {
            if (error.error["error_message"] === "Authentication Failed") {
              this.getEncryptionRecoveryKey();
            } else {
              this.preferenceResolver.dataModel.clicked_recovery_key = true;
              let erk = error.error["text"].match(/.{1,4}/g).join("-");
              let modalRef = this.modalService.open(EncryptionRecoveryKeyComponent);
              modalRef.componentInstance.erk = erk;
            }
          }
        }
      );
    };
  }

  save() {
    if (this.preferenceResolver.dataModel.pgp_key_remove) {
      this.preferenceResolver.dataModel.pgp_key_public = "";
    }
    let requestObservable = this.httpService.updatePreferenceResource(JSON.stringify(this.preferenceResolver.dataModel));
    requestObservable.subscribe(
      {
        next: _ => {
          this.translationService.onChange(this.preferenceResolver.dataModel.language);
        }
      }
    );
  };

  onlanguagechange() {
    this.preferenceResolver.dataModel.language = this.languageModel;
  }

}
