import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SimpleLoginComponent } from './login/templates/simple-login/simple-login.component';
import { DefaultLoginComponent } from './login/templates/default-login/default-login.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PasswordreqestedComponent } from './passwordreqested/passwordreqested.component';
import { PasswordResetResponseComponent } from './password-reset-response/password-reset-response.component';

@NgModule({
  declarations: [
    LoginComponent,
    SimpleLoginComponent,
    DefaultLoginComponent,
    PasswordreqestedComponent,
    PasswordResetResponseComponent
  ],
  imports: [CommonModule, TranslateModule, FormsModule, NgSelectModule],
})
export class AuthModule {}
