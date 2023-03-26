import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SimpleLoginComponent } from './login/templates/simple-login/simple-login.component';
import { DefaultLoginComponent } from './login/templates/default-login/default-login.component';
<<<<<<< HEAD
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [LoginComponent, SimpleLoginComponent, DefaultLoginComponent],
  imports: [CommonModule, TranslateModule, FormsModule, NgSelectModule],
=======
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";
import { PasswordResetComponent } from './password-reset/password-reset.component';



@NgModule({
  declarations: [
    LoginComponent,
    SimpleLoginComponent,
    DefaultLoginComponent,
    PasswordResetComponent
  ],
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
    ]
>>>>>>> 2b329da6c56a6e34fa9cf355177fe5dc1f9d92e5
})
export class AuthModule {}
