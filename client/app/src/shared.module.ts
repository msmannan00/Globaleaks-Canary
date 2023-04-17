import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterComponent} from "./shared/partials/footer/footer.component";
import { ReceiptComponent } from './shared/partials/receipt/receipt.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslatorPipe} from "./shared/pipes/translate";
import { Enable2fa } from './shared/partials/enable-2fa/enable-2fa';
import {TranslateModule} from "@ngx-translate/core";
import {QRCodeModule} from "angularx-qrcode";
import { PasswordChangeComponent } from './shared/partials/password-change/password-change.component';
import { PasswordMeterComponent } from './shared/components/password-meter/password-meter.component';
import {NgbProgressbar} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        FormsModule,
        QRCodeModule,
        ReactiveFormsModule,
        NgbProgressbar,
    ],
  declarations: [
    FooterComponent,
    ReceiptComponent,
    TranslatorPipe,
    Enable2fa,
    PasswordChangeComponent,
    PasswordMeterComponent,
  ],
    exports: [
        FooterComponent,
        ReceiptComponent,
        TranslatorPipe,
        Enable2fa,
        PasswordChangeComponent,
    ]})
export class SharedModule { }
