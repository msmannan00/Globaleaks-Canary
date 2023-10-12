import {Component} from "@angular/core";
import {TwofactorauthData} from "../../../services/2fa.data.service";
import {HttpService} from "../../../shared/services/http.service";
import {PreferenceResolver} from "../../../shared/resolvers/preference.resolver";
import {AuthenticationService} from "../../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: "src-forced-two-factor",
  templateUrl: "./forced-two-factor.component.html",
  styleUrls: ["./forced-two-factor.component.css"]
})
export class ForcedTwoFactorComponent {
  constructor(public twofactorauthData: TwofactorauthData, private httpService: HttpService, private preferenceResolver: PreferenceResolver, private authenticationService: AuthenticationService, private router: Router) {
  }

  enable2FA() {
    let data = {
      "operation": "enable_2fa",
      "args": {
        "secret": this.twofactorauthData.totp.secret,
        "token": this.twofactorauthData.totp.token
      }
    };

    let requestObservable = this.httpService.requestOperations(data);
    requestObservable.subscribe(
      {
        next: response => {
          this.preferenceResolver.dataModel.two_factor = true;
          this.authenticationService.session.two_factor = true;
          this.router.navigate([this.authenticationService.session.homepage]).then(r => {
          });
        }
      }
    );
  }
}
