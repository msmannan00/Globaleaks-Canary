import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
import { PreferenceTab1Component } from "../preference-tabs/preference-tab1/preference-tab1.component";
import { PreferenceTab2Component } from "../preference-tabs/preference-tab2/preference-tab2.component";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'src-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css']
})
export class PreferencesComponent {
  activeTab: string = "tab1";

  tabs = [
    {
      id: 'tab1',
      title: 'One',
      component: PreferenceTab1Component
    },
    {
      id: 'tab2',
      title: 'Two',
      component: PreferenceTab2Component
    }
  ];

}