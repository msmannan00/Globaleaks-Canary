import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NodeResolver } from 'app/src/shared/resolvers/node.resolver';

@Component({
  selector: 'src-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements AfterViewInit, OnInit {
  @ViewChild('tab1') tab1!: TemplateRef<any>;
  @ViewChild('tab2') tab2!: TemplateRef<any>;
  @ViewChild('tab3') tab3!: TemplateRef<any>;
  @ViewChild('tab4') tab4!: TemplateRef<any>;
  tabs: any[];
  nodeData: any
  active: string

  constructor(public node: NodeResolver) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.active = "HTTPS"

    this.nodeData = this.node
    this.tabs = [
      {
        title: 'HTTPS',
        component: this.tab1
      },
      {
        title: 'Tor',
        component: this.tab2
      },
      {
        title: 'Access control',
        component: this.tab3
      },
      {
        title: 'URL redirects',
        component: this.tab4
      },
    ];

  }
}
