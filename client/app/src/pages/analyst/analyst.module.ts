import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";

import {FormsModule} from "@angular/forms";
import {NgbDatepickerModule, NgbDropdownModule, NgbModule, NgbNavModule} from "@ng-bootstrap/ng-bootstrap";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import { HomeComponent } from '@app/pages/analyst/home/home.component';
import { AnalystSidebarComponent } from '@app/pages/analyst/sidebar/sidebar.component';
import { StatisticsComponent } from '@app/pages/analyst/statistics/statistics.component';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';


@NgModule({
    imports: [
    CommonModule, RouterModule, TranslateModule, FormsModule,
    NgbModule, NgbNavModule, BaseChartDirective,
    NgbDatepickerModule, NgbDropdownModule, NgMultiSelectDropDownModule.forRoot(),
    HomeComponent,
    AnalystSidebarComponent,
    StatisticsComponent
],
    providers: [provideCharts(withDefaultRegisterables())],
    exports: [AnalystSidebarComponent]
})
export class AnalystModule { }
