import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { InternationalizationComponent } from './internationalization/internationalization.component';
import { LibsRoutingModule } from './libs-routing.module';
import { QrCodeComponent } from './qr-code/qr-code.component';
import { QRCodeModule } from 'angularx-qrcode';
import { FastshaComponent } from './fastshah/fastsha.component';
import { ShowdownComponent } from './showdown/showdown.component';
import {ShowdownModule} from "ngx-showdown";
import {FormsModule} from "@angular/forms";
import { IdleComponent } from './idle/idle.component';
import {NgIdleModule} from "@ng-idle/core";
import {NgIdleKeepaliveModule} from "@ng-idle/keepalive";
import { DropdownMultiselectComponent } from './dropdown-multiselect/dropdown-multiselect.component';
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import { MetrofontComponent } from './metrofont/metrofont.component';
import { AriaComponent } from './aria/aria.component';
import { NgcsvComponent } from './ngcsv/ngcsv.component';

@NgModule({
  declarations: [
    InternationalizationComponent,
    FastshaComponent,
    QrCodeComponent,
    ShowdownComponent,
    IdleComponent,
    DropdownMultiselectComponent,
    MetrofontComponent,
    AriaComponent,
    NgcsvComponent,
  ],
    imports: [
        CommonModule, TranslateModule, LibsRoutingModule, FormsModule, ShowdownModule, QRCodeModule,NgIdleModule, NgIdleKeepaliveModule.forRoot(),NgMultiSelectDropDownModule.forRoot(),
    ]
})
export class LibsModule {}
