import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FooterComponent} from "./footer/footer.component";
import { UserHomeComponent } from './user-home/user-home.component';
import { UserWarningsComponent } from './user-warnings/user-warnings.component';
import { ReceiptComponent } from './receipt/receipt.component';
import {FormsModule} from "@angular/forms";



@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
  declarations: [
    FooterComponent,
    UserHomeComponent,
    UserWarningsComponent,
    ReceiptComponent
  ],
  exports: [
    FooterComponent,
    ReceiptComponent
  ]})
export class SharedModule { }
