import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterComponent} from "./shared/components/footer/footer.component";
import { ReceiptComponent } from './shared/components/receipt/receipt.component';
import {FormsModule} from "@angular/forms";
import {TranslatePipe} from "./shared/pipes/translate";
import {UserHomeComponent} from "./shared/components/header/template/user-home/user-home.component";

@NgModule({
  imports: [
      CommonModule,
      FormsModule
  ],
  declarations: [
    FooterComponent,
    UserHomeComponent,
    ReceiptComponent,
    TranslatePipe
  ],
  exports: [
    FooterComponent,
    ReceiptComponent,
    TranslatePipe
  ]})
export class SharedModule { }
