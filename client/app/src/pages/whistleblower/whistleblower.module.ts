import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import {TranslateModule} from "@ngx-translate/core";
import {SharedModule} from "../../shared.module";



@NgModule({
    declarations: [
        HomepageComponent,
    ],
    exports: [
        HomepageComponent
    ],
    imports: [
        CommonModule,
        TranslateModule,
        SharedModule
    ]
})
export class WhistleblowerModule { }
