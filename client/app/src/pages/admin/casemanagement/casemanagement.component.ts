import {Component, TemplateRef, ViewChild} from '@angular/core';
import {NodeResolver} from "../../../shared/resolvers/node.resolver";

@Component({
  selector: 'src-casemanagement',
  templateUrl: './casemanagement.component.html'
})
export class CasemanagementComponent {
  @ViewChild('tab1') tab1!: TemplateRef<any>;
  tabs: any[];
  nodeData: any
  active:string
  constructor(public node: NodeResolver) { }
  ngOnInit() { }

  ngAfterViewInit(): void {
    this.active="Report statuses"

    this.nodeData = this.node
    this.tabs = [
      {
        title: 'Report statuses',
        component: this.tab1
      },
    ];
  }
}
