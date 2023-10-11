import { Component, TemplateRef, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { NodeResolver } from 'app/src/shared/resolvers/node.resolver';

@Component({
  selector: 'src-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, AfterViewInit {
  @ViewChild('tab1') tab1!: TemplateRef<any>;
  @ViewChild('tab2') tab2!: TemplateRef<any>;

  tabs: any[];
  nodeData: any;
  active: string;

  constructor(
    public node: NodeResolver,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.active = "Settings";

      this.nodeData = this.node;
      this.tabs = [
        {
          title: 'Settings',
          component: this.tab1
        },
        {
          title: 'Templates',
          component: this.tab2
        },
      ];

      // Mark the component for a manual change detection run
      this.cdr.detectChanges();
    });
  }
}
