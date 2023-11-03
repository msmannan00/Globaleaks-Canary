import {AfterViewInit, ChangeDetectorRef, Component, TemplateRef, ViewChild} from "@angular/core";

@Component({
  selector: "src-settings",
  templateUrl: "./settings.component.html"
})
export class SettingsComponent implements AfterViewInit {
  @ViewChild("tab1") tab1!: TemplateRef<any>;
  tabs: any[];
  nodeData: any;
  active: string;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    this.active = "Settings";

    this.tabs = [
      {
        title: "Settings",
        component: this.tab1
      },
    ];
    this.cdr.detectChanges();
  }
}

