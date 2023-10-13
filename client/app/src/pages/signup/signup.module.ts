import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SignupComponent} from "./signup/signup.component";
import {TranslateModule} from "@ngx-translate/core";
import {SignupdefaultComponent} from "./templates/signupdefault/signupdefault.component";
import {SharedModule} from "@app/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {TosComponent} from "./templates/tos/tos.component";
import {WbpaComponent} from "./templates/wbpa/wbpa.component";
import {ActivationComponent} from "./templates/activation/activation.component";


@NgModule({
  declarations: [
    SignupComponent,
    SignupdefaultComponent,
    TosComponent,
    WbpaComponent,
    ActivationComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    SharedModule
  ]
})
export class SignupModule {
}
