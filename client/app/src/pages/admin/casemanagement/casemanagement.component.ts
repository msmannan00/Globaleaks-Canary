import { Component, TemplateRef, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { NodeResolver } from "../../../shared/resolvers/node.resolver";

@Component({
  selector: 'src-casemanagement',
  templateUrl: './casemanagement.component.html'
})
export class CasemanagementComponent implements OnInit, AfterViewInit {
  @ViewChild('tab1') tab1!: TemplateRef<any>;
  tabs: any[];
  nodeData: any;
  active: string;

  constructor(
    public node: NodeResolver,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.active = "Report statuses";

      this.nodeData = this.node;
      this.tabs = [
        {
          title: 'Report statuses',
          component: this.tab1
        },
      ];

      this.cdr.detectChanges();
    });
  }
}
