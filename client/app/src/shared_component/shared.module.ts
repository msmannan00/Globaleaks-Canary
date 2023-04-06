import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterComponent} from "./footer/footer.component";
import { UserHomeComponent } from './user-home/user-home.component';
import { UserWarningsComponent } from './user-warnings/user-warnings.component';
import { ReceiptComponent } from './receipt/receipt.component';
import {FormsModule} from "@angular/forms";
import {TranslatePipe} from "../shared/pipes/translate";

@NgModule({
  imports: [
      CommonModule,
      FormsModule
  ],
  declarations: [
    FooterComponent,
    UserHomeComponent,
    UserWarningsComponent,
    ReceiptComponent,
    TranslatePipe
  ],
  exports: [
    FooterComponent,
    ReceiptComponent,
    TranslatePipe
  ]})
export class SharedModule { }
