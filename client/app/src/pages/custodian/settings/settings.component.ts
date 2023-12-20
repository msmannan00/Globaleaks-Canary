import {Component, TemplateRef, ViewChild} from "@angular/core";
import { Tab } from "@app/models/component-model/tab";

@Component({
  selector: "src-custodian-settings",
  templateUrl: "./settings.component.html"
})
export class SettingsComponent {
  @ViewChild("tab1") tab1!: TemplateRef<any>;
  tabs: Tab[];
  active: string;

  ngAfterViewInit(): void {
    this.active = "Settings";

    this.tabs = [
      {
        title: "Settings",
        component: this.tab1
      },
    ];
  }
}
