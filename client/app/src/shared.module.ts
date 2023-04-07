import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterComponent} from "./shared/components/footer/footer.component";
import { ReceiptComponent } from './shared/components/receipt/receipt.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslatorPipe} from "./shared/pipes/translate";
import { Enable2fa } from './shared/enable-2fa/enable-2fa';
import {TranslateModule} from "@ngx-translate/core";
import {QRCodeModule} from "angularx-qrcode";

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    QRCodeModule,
    ReactiveFormsModule,
  ],
  declarations: [
    FooterComponent,
    ReceiptComponent,
    TranslatorPipe,
    Enable2fa,
  ],
  exports: [
    FooterComponent,
    ReceiptComponent,
    TranslatorPipe,
    Enable2fa,
  ]})
export class SharedModule { }
