import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbNavModule,NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { adminHomeComponent } from './home/admin-home.component';
import { SharedModule } from 'app/src/shared.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    adminHomeComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,SharedModule,NgbNavModule,NgbModule,RouterModule,FormsModule
  ],
  exports:[SidebarComponent]
})
export class AdminModule { }
