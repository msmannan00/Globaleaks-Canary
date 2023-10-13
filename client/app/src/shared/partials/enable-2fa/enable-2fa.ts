import {Component} from "@angular/core";
import {UtilsService} from "../../services/utils.service";
import {PreferenceResolver} from "../../resolvers/preference.resolver";
import {FormBuilder, FormGroup} from "@angular/forms";
import {TwoFactorAuthData} from "@app/services/2fa.data.service";

@Component({
  selector: "src-enable-2fa",
  templateUrl: "./enable-2fa.html"
})
export class Enable2fa {

  symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  array = new Uint32Array(32);
  OTPSecretForm: FormGroup;

  ngOnInit() {
    this.OTPSecretForm = this.builder.group({});
  };

  initialization() {
    window.crypto.getRandomValues(this.array);

    for (let i = 0; i < this.array.length; i++) {
      this.twofactorauthData.totp.secret += this.symbols[this.array[i] % this.symbols.length];
    }

    this.onSecretKeyChanged();
  }

  constructor(public utils: UtilsService, public preferenceResolver: PreferenceResolver, private builder: FormBuilder, public twofactorauthData: TwoFactorAuthData) {
    this.initialization();
  }

  onSecretKeyChanged() {
    this.twofactorauthData.totp.qrcode_string = "otpauth://totp/" + location.host + "%20%28" + this.preferenceResolver.dataModel.username + "%29?secret=" + this.twofactorauthData.totp.secret;
  }
}
