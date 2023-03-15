import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { InternationalizationComponent } from './internationalization/internationalization.component';
import { LibsRoutingModule } from './libs-routing.module';
import { QrCodeComponent } from './qr-code/qr-code.component';
import { QRCodeModule } from 'angularx-qrcode';
import { FastshaComponent } from './fastshah/fastsha.component';
import { FormsModule } from '@angular/forms';
import {FormsModule} from "@angular/forms";
import { ShowdownComponent } from './showdown/showdown.component';
import {ShowdownModule} from "ngx-showdown";

@NgModule({
  declarations: [
    InternationalizationComponent,
    FastshaComponent,
    QrCodeComponent,
    ShowdownComponent
  ],
    imports: [
        CommonModule, TranslateModule, LibsRoutingModule, FormsModule, ShowdownModule, QRCodeModule
    ]
})
export class LibsModule {}
