import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {SharedModule} from "../../shared.module";
import {WizardComponent} from "./wizard/wizard.component";
import {ProfileComponent} from "./wizard/template/profile/profile.component";


@NgModule({
  declarations: [
    WizardComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    SharedModule
  ]
})
export class WizardModule { }
