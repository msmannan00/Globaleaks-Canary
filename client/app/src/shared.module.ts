import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterComponent} from "./shared/components/footer/footer.component";
import { ReceiptComponent } from './shared/components/receipt/receipt.component';
import {FormsModule} from "@angular/forms";
import {TranslatorPipe} from "./shared/pipes/translate";

@NgModule({
  imports: [
      CommonModule,
      FormsModule
  ],
  declarations: [
    FooterComponent,
    ReceiptComponent,
    TranslatorPipe
  ],
  exports: [
    FooterComponent,
    ReceiptComponent,
    TranslatorPipe
  ]})
export class SharedModule { }
