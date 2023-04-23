import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import {TranslateModule} from "@ngx-translate/core";
import {SharedModule} from "../../shared.module";
import {MarkdownModule} from "ngx-markdown";
import { TippageComponent } from './tippage/tippage.component';
import { WhistleblowerIdentityComponent } from '../../shared/partials/whistleblower-identity/whistleblower-identity.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



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
        ReactiveFormsModule,
        FormsModule,
    ]
})
export class WhistleblowerModule { }
