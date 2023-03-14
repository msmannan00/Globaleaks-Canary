import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { InternationalizationComponent } from './internationalization/internationalization.component';
import { LibsRoutingModule } from './libs-routing.module';
import { QrCodeComponent } from './qr-code/qr-code.component';
import { QRCodeModule } from 'angularx-qrcode';
// import { TranslateModule } from '@ngx-translate/core';
// import { InternationalizationComponent } from './internationalization/internationalization.component';
// import { LibsRoutingModule } from './libs-routing.module';
import { FastshaComponent } from './fastshah/fastsha.component';
import { FormsModule } from '@angular/forms';

// @NgModule({
//   declarations: [InternationalizationComponent, QrCodeComponent],
//   imports: [CommonModule, TranslateModule, LibsRoutingModule, QRCodeModule],

@NgModule({
  declarations: [
    InternationalizationComponent,
    FastshaComponent,
    QrCodeComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    LibsRoutingModule,
    FormsModule,
    QRCodeModule,
  ],
})
export class LibsModule {}
