import {NgModule} from "@angular/core";

import {CommonModule} from "@angular/common";
import {HomeComponent} from "@app/pages/recipient/home/home.component";
import {ReceiptSidebarComponent} from "@app/pages/recipient/sidebar/sidebar.component";
import {RouterModule} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";

import {TipsComponent} from "@app/pages/recipient/tips/tips.component";
import {TipComponent} from "@app/pages/recipient/tip/tip.component";
import {SettingsComponent} from "@app/pages/recipient/settings/settings.component";
import {FormsModule} from "@angular/forms";
import {NgbDatepickerModule, NgbDropdownModule, NgbModule, NgbNavModule} from "@ng-bootstrap/ng-bootstrap";
import {
  WhistleBlowerIdentityReceiverComponent
} from "@app/pages/recipient/whistleblower-identity-reciever/whistle-blower-identity-receiver.component";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";

@NgModule({
    imports: [
    CommonModule, RouterModule, TranslateModule, FormsModule,
    NgbModule, NgbNavModule,
    NgbDatepickerModule, NgbDropdownModule, NgMultiSelectDropDownModule.forRoot(),
    HomeComponent,
    ReceiptSidebarComponent,
    TipsComponent,
    TipComponent,
    SettingsComponent,
    WhistleBlowerIdentityReceiverComponent
],
    exports: [ReceiptSidebarComponent]
})
export class RecipientModule {
}
