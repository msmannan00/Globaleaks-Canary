import {Component, OnInit} from '@angular/core';
import {PreferenceResolver} from "../../../resolvers/preference.resolver";
import {UtilsService} from "../../../services/utils.service";
import {AuthenticationService} from "../../../../services/authentication.service";
import {AppDataService} from "../../../../app-data.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Enable2faComponent} from "../../../modals/enable2fa/enable2fa.component";
import {TwofactorauthData} from "../../../../services/2fa.data.service";
import {HttpService} from "../../../services/http.service";
import {ConfirmationWithPasswordComponent} from "../../../modals/confirmation-with-password/confirmation-with-password.component";
import {HttpHeaders} from "@angular/common/http";
import {EncryptionRecoveryKeyComponent} from "../../../modals/encryption-recovery-key/encryption-recovery-key.component";
import {TranslationService} from "../../../../services/translation.service";
import {TranslateService} from "@ngx-translate/core";
import {ConfirmationWith2faComponent} from "../../../modals/confirmation-with2fa/confirmation-with2fa.component";

@Component({
  selector: 'src-preference-tab1',
  templateUrl: './preference-tab1.component.html',
  styleUrls: ['./preference-tab1.component.css']
})
export class PreferenceTab1Component implements OnInit{

  editingName:boolean
  editingPublicName:boolean
  editingEmailAddress:boolean
  languageModel = ""
  role=""

  toggleNameEditing() {
    this.editingName = !this.editingName;
  };

  togglePublicNameEditing() {
    this.editingPublicName = !this.editingPublicName;
  };

  toggleEmailAddressEditing() {
    this.editingEmailAddress = !this.editingEmailAddress;
  };

  toggle2FA(event: Event){
    if (!this.preferenceResolver.dataModel.two_factor) {
      let array = new Uint32Array(32);

      window.crypto.getRandomValues(array);

      this.twofactorauthData.totp.secret = ""
      this.twofactorauthData.totp.qrcode_string = ""
      this.twofactorauthData.totp.edit = false

      this.modalService.open(Enable2faComponent);

    } else {
      let modalRef = this.modalService.open(ConfirmationWith2faComponent);
       modalRef.result.then(
          (result) => {
              let data = {
                  "operation": "disable_2fa",
                  "args": {
                      "secret": result,
                      "token": this.twofactorauthData.totp.token
                  }
              }

              const headers = new HttpHeaders()
                  .set('Content-Type', 'application/json')
                  .set('X-Confirmation', result);

              this.httpService.requestOperations(data, headers).subscribe(
                  {
                      next: response => {
                          this.preferenceResolver.dataModel.two_factor = !this.preferenceResolver.dataModel.two_factor
                          this.utilsService.reloadCurrentRoute();
                      },
                      error: (error: any) => {
                          this.utilsService.reloadCurrentRoute();
                      }
                  }
              )
          },
          (reason) => {
          }
      );
    }

    event.preventDefault();
    return false;
  }

  getEncryptionRecoveryKey() {

    let modalRef = this.modalService.open(ConfirmationWithPasswordComponent);

    modalRef.result.then(
        (result) => {
          let data = {
            "operation": "get_recovery_key",
            "args": {
              "secret": this.twofactorauthData.totp.secret,
              "token": this.twofactorauthData.totp.token
            }
          }

          const headers = new HttpHeaders()
             .set('Content-Type', 'application/json')
             .set('X-Confirmation', result);

          let requestObservable = this.httpService.requestOperations(data, headers);
          requestObservable.subscribe(
              {
                next: response => {
                  this.preferenceResolver.dataModel.clicked_recovery_key = true;
                  let erk = response.data['text'].match(/.{1,4}/g).join("-");
                  let modalRef = this.modalService.open(EncryptionRecoveryKeyComponent);
                  modalRef.componentInstance.erk = erk;
                },
                error: (error: any) => {
                  this.preferenceResolver.dataModel.clicked_recovery_key = true;
                  let erk = error.error['text'].match(/.{1,4}/g).join("-");
                  let modalRef = this.modalService.open(EncryptionRecoveryKeyComponent);
                  modalRef.componentInstance.erk = erk;
                }
              }
          );
        },
        (reason) => {
          console.log('Modal dismissed:', reason);
        }
    );
  }

  save() {
    if (this.preferenceResolver.dataModel.pgp_key_remove) {
      this.preferenceResolver.dataModel.pgp_key_public = "";
    }
    let requestObservable = this.httpService.updatePreferenceResource(JSON.stringify(this.preferenceResolver.dataModel), {});
    requestObservable.subscribe(
        {
            next: response => {
                this.translationService.onChange(this.preferenceResolver.dataModel.language)
            },
            error: (error: any) => {
            }
        }
    );
  };

  onlanguagechange(){
      this.preferenceResolver.dataModel.language = this.languageModel
  }

  ngOnInit(): void {
      this.role = this.utilsService.role_l10n(this.authenticationService.session.role)
      this.role = this.translateService.instant(this.role)
      setTimeout(() => {
          this.languageModel = this.preferenceResolver.dataModel.language
      }, 150);
  }

  onCheckboxChange($event: Event) {
      $event.preventDefault();
  }

  constructor(public translationService:TranslationService, public translateService:TranslateService, public httpService: HttpService, private twofactorauthData:TwofactorauthData, public modalService: NgbModal, public appDataService:AppDataService, public preferenceResolver:PreferenceResolver, public utilsService:UtilsService, public authenticationService:AuthenticationService) {
  }

}
