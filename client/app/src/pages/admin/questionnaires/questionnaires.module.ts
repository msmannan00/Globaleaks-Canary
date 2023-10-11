import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionnairesRoutingModule } from './questionnaires-routing.module';
import { QuestionnairesComponent } from './questionnaires.component';
import { AddFieldFromTemplateComponent } from './add-field-from-template/add-field-from-template.component';
import { AddFieldComponent } from './add-field/add-field.component';
import { FieldsComponent } from './fields/fields.component';
import { MainComponent } from './main/main.component';
import { QuestionsComponent } from './questions/questions.component';
import { StepComponent } from './step/step.component';
import { StepsComponent } from './steps/steps.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbNavModule, NgbModule, NgbDropdownModule, NgbDatepickerModule, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from 'app/src/shared.module';
import { StepsListComponent } from './steps-list/steps-list.component';
import { QuestionnairesListComponent } from './questionnaires-list/questionnaires-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { MarkdownModule } from 'ngx-markdown';


@NgModule({
  declarations: [
    QuestionnairesComponent,
    AddFieldFromTemplateComponent,
    AddFieldComponent,
    FieldsComponent,
    MainComponent,
    QuestionsComponent,
    StepComponent,
    StepsComponent,
    StepsListComponent,
    QuestionnairesListComponent
  ],
  imports: [
    CommonModule,
    QuestionnairesRoutingModule, SharedModule, NgbNavModule, NgbModule, RouterModule, FormsModule, NgSelectModule,
    NgbDropdownModule,
    TranslateModule,
    MarkdownModule,
    ReactiveFormsModule,NgbDatepickerModule,NgbDatepicker
    
  ]
})
export class QuestionnairesModule { }
