import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";
import {InternationalizationComponent} from "./internationalization/internationalization.component";
import {LibsRoutingModule} from "./libs-routing.module";



@NgModule({
  declarations: [
    InternationalizationComponent
  ],
  imports: [
    CommonModule, TranslateModule, LibsRoutingModule
  ]
})
export class LibsModule { }
