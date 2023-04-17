import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import {TranslateModule} from "@ngx-translate/core";
import { ReceiptComponent } from './receipt/receipt.component';



@NgModule({
    declarations: [
        HomepageComponent,
        ReceiptComponent
    ],
    exports: [
        HomepageComponent
    ],
    imports: [
        CommonModule,
        TranslateModule
    ]
})
export class WhistleblowerModule { }
