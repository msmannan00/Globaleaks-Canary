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
import { NgbDatepickerModule, NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WhistleBlowerIdentityRecieverComponent } from './whistleblower-identity-reciever/whistleblower-identity-reciever.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    HomeComponent,
    SidebarComponent,
    TipsComponent,
    TipComponent,
    SettingsComponent,
    WhistleBlowerIdentityRecieverComponent
  ],
  imports: [
    CommonModule,RouterModule,TranslateModule,SharedModule,FormsModule,
    NgbModule,
    NgbDatepickerModule,NgbDropdownModule,NgMultiSelectDropDownModule.forRoot()

  ],
  exports:[SidebarComponent]
})
export class RecipientModule { }
