import {Component, TemplateRef, ViewChild} from '@angular/core';
import {NodeResolver} from "../../../shared/resolvers/node.resolver";

@Component({
  selector: 'src-sites',
  templateUrl: './sites.component.html'
})
export class SitesComponent {
  @ViewChild('tab1') tab1!: TemplateRef<any>;
  @ViewChild('tab2') tab2!: TemplateRef<any>;
  tabs: any[];
  nodeData: any
  active:string

  constructor(public node: NodeResolver) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.active="Sites"

    this.nodeData = this.node
    this.tabs = [
      {
        title: 'Sites',
        component: this.tab1
      },
    ];
    if (this.node.authenticationService.session.role === "admin") {
      this.tabs = this.tabs.concat([
        {
          title: 'Options',
          component: this.tab2
        }
      ]);
    }
  }
}
