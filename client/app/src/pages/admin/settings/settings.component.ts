import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { NodeResolver } from 'app/src/shared/resolvers/node.resolver';
import { SidebarComponent } from '../../recipient/sidebar/sidebar.component';


@Component({
  selector: 'src-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements AfterViewInit {
  @ViewChild('tab1') tab1!: TemplateRef<any>;
  @ViewChild('tab2') tab2!: TemplateRef<any>;
  @ViewChild('tab3') tab3!: TemplateRef<any>;
  @ViewChild('tab4') tab4!: TemplateRef<any>;
  @ViewChild('tab5') tab5!: TemplateRef<any>;
  tabs: any[];
nodeData:any
  constructor(public node: NodeResolver) {
    // console.log( this.tab1," tab1");

    //     this.tabs = [
    //       {
    //         title: 'Settings',
    //         template: this.tab1,
    //       }
    //     ];
    // if (this.node.authenticationService.session.role === "admin") {
    //   this.tabs = this.tabs.concat([
    //     {
    //       title: 'Theme customization',
    //       component: 'tab2' // Component name for Tab2Component
    //     },
    //     {
    //       title: 'Languages',
    //       component: 'tab3' // Component name for Tab3Component
    //     },
    //     {
    //       title: 'Text customization',
    //       component: 'tab4' // Component name for Tab4Component
    //     },
    //     {
    //       title: 'Advanced',
    //       component: 'tab5' // Component name for Tab5Component
    //     }
    //   ]);
    // }
  }
  ngAfterViewInit(): void {
    this.nodeData = this.node
    this.tabs = [
      {
        title: 'Settings',
        component: this.tab1
      },
    ];
    if (this.node.authenticationService.session.role === "admin") {
      this.tabs = this.tabs.concat([
        {
          title: 'Theme customization',
          component: this.tab2
        },
        {
          title: 'Languages',
          component: this.tab3
        },
        {
          title: 'Text customization',
          component: this.tab4
        },
        {
          title: 'Advanced',
          component: this.tab5
        }
      ]);
    }
  }
  ngOnInit() { }
}
