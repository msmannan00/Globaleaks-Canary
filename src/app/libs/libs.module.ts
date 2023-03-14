import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";
import {InternationalizationComponent} from "./internationalization/internationalization.component";
import {LibsRoutingModule} from "./libs-routing.module";
import { FastshaComponent } from './fastshah/fastsha.component';
import {FormsModule} from "@angular/forms";
import { ShowdownComponent } from './showdown/showdown.component';
import {ShowdownModule} from "ngx-showdown";



@NgModule({
  declarations: [
    InternationalizationComponent,
    FastshaComponent,
    ShowdownComponent
  ],
    imports: [
        CommonModule, TranslateModule, LibsRoutingModule, FormsModule, ShowdownModule
    ]
})
export class LibsModule { }
