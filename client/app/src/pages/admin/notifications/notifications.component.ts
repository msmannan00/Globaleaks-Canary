import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NodeResolver } from 'app/src/shared/resolvers/node.resolver';

@Component({
  selector: 'src-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent  implements AfterViewInit ,OnInit{
  @ViewChild('tab1') tab1!: TemplateRef<any>;
  @ViewChild('tab2') tab2!: TemplateRef<any>;

  tabs: any[];
  nodeData: any
  active:string

  constructor(public node: NodeResolver) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.active="Settings"

    this.nodeData = this.node
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
    // if (this.node.authenticationService.session.role === "admin") {
    //   this.tabs = this.tabs.concat([
    //     {
    //       title: 'Users',
    //       component: this.tab2
    //     },
    //     {
    //       title: 'Reports',
    //       component: this.tab3
    //     },
    //     {
    //       title: 'Scheduled jobs',
    //       component: this.tab4
    //     }
    //   ]);
    // }
  }
}

