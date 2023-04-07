import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForcedTwoFactorComponent } from './forced-two-factor/forced-two-factor.component';
import {SharedModule} from "../../shared.module";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [
    ForcedTwoFactorComponent
  ],
    imports: [
        CommonModule,
        TranslateModule,
        SharedModule
    ]
})
export class ActionModule { }
