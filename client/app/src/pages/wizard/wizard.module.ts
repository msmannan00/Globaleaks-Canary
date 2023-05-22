import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'app/src/shared.module';
import { ProfileComponent } from './home/templates/profile.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
  ];
  


@NgModule({
  declarations: [HomeComponent,ProfileComponent],
  imports: [RouterModule.forChild(routes),CommonModule,TranslateModule, NgbTooltipModule,FormsModule,SharedModule],
  exports: [RouterModule],
  providers: [],
})
export class WizardModule { }