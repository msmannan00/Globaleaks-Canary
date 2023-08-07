import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbNavModule,NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { SharedModule } from 'app/src/shared.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
// import { SettingsComponent } from './settings/settings.component';



@NgModule({
  declarations: [
    HomeComponent,
    // SettingsComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,SharedModule,NgbNavModule,NgbModule,RouterModule,FormsModule
  ],
  exports:[SidebarComponent]
})
export class AdminModule { }
