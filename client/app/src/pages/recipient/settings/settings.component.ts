import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
@Component({
  selector: 'src-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements AfterViewInit, OnInit {
  @ViewChild('tab1') tab1!: TemplateRef<any>;
  tabs: any[];
  nodeData: any
  active: string
  constructor() { }
  ngOnInit() { }

  ngAfterViewInit(): void {
    this.active = "Settings"

    this.tabs = [
      {
        title: 'Settings',
        component: this.tab1
      },
    ];

  }
}

