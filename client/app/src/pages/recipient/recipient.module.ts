import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'app/src/shared.module';
import { TipsComponent } from './tips/tips.component';
import { TipComponent } from './tip/tip.component';
import { SettingsComponent } from './settings/settings.component';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbDropdownModule, NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { WhistleBlowerIdentityRecieverComponent } from './whistleblower-identity-reciever/whistleblower-identity-reciever.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { Tab1Component } from './tab1/tab1.component';

@NgModule({
  declarations: [
    HomeComponent,
    SidebarComponent,
    TipsComponent,
    TipComponent,
    Tab1Component,
    SettingsComponent,
    WhistleBlowerIdentityRecieverComponent
  ],
  imports: [
    CommonModule,RouterModule,TranslateModule,SharedModule,FormsModule,
    NgbModule,NgbNavModule,
    NgbDatepickerModule,NgbDropdownModule,NgMultiSelectDropDownModule.forRoot()

  ],
  exports:[SidebarComponent]
})
export class RecipientModule { }
