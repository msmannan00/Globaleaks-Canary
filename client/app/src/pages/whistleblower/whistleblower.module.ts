import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import {TranslateModule} from "@ngx-translate/core";
import {SharedModule} from "../../shared.module";
import {MarkdownModule} from "ngx-markdown";
import { TippageComponent } from './tippage/tippage.component';
import { WhistleblowerIdentityComponent } from './whistleblower-identity/whistleblower-identity.component';



@NgModule({
    declarations: [
        HomepageComponent,
        TippageComponent,
        WhistleblowerIdentityComponent
    ],
    exports: [
        HomepageComponent,
        TippageComponent
    ],
    imports: [
        CommonModule,
        TranslateModule,
        SharedModule,
        MarkdownModule,
    ]
})
export class WhistleblowerModule { }
