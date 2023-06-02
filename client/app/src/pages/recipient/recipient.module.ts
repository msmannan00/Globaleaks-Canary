import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'app/src/shared.module';
import { TipsComponent } from './tips/tips.component';
import { TipComponent } from './tip/tip.component';
import { WhistleBlowerComponent } from './whistleblower-identity/whistleblower-identity.component';
import { SettingsComponent } from './settings/settings.component';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    HomeComponent,
    SidebarComponent,
    TipsComponent,
    TipComponent,
    WhistleBlowerComponent,
    SettingsComponent,
    
  ],
  imports: [
    CommonModule,RouterModule,TranslateModule,SharedModule,FormsModule,
    NgbModule,
    NgbDatepickerModule,NgbDropdownModule,
  ],
  exports:[SidebarComponent]
})
export class RecipientModule { }
