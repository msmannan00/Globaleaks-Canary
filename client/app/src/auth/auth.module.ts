import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SimpleLoginComponent } from './login/templates/simple-login/simple-login.component';
import { DefaultLoginComponent } from './login/templates/default-login/default-login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PasswordreqestedComponent } from './passwordreqested/passwordreqested.component';
import { PasswordResetResponseComponent } from './password-reset-response/password-reset-response.component';
import {TranslateModule} from "@ngx-translate/core";
import {SharedModule} from "../shared_component/shared.module";

@NgModule({
  declarations: [
    LoginComponent,
    SimpleLoginComponent,
    DefaultLoginComponent,
    PasswordResetComponent,
    PasswordreqestedComponent,
    PasswordResetResponseComponent,
  ],
    imports: [
      CommonModule,
      TranslateModule,
      FormsModule,
      NgSelectModule,
      ReactiveFormsModule,
      SharedModule
    ]
})
export class AuthModule {}
