import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NodeResolver} from "../../../shared/resolvers/node.resolver";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'src-auditlog',
  templateUrl: './auditlog.component.html'
})
export class AuditlogComponent implements AfterViewInit ,OnInit{
  @ViewChild('tab1') tab1!: TemplateRef<any>;
  @ViewChild('tab2') tab2!: TemplateRef<any>;
  @ViewChild('tab3') tab3!: TemplateRef<any>;
  @ViewChild('tab4') tab4!: TemplateRef<any>;
  tabs: any[];
  nodeData: any
  active:string

  constructor(public node: NodeResolver, public authenticationService:AuthenticationService) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.active="Audit Log"

    this.nodeData = this.node
    this.tabs = [
      {
        title: 'Audit Log',
        component: this.tab1
      },
    ];
    if (this.authenticationService.session.role === "admin") {
      this.tabs = this.tabs.concat([
        {
          title: 'Users',
          component: this.tab2
        },
        {
          title: 'Reports',
          component: this.tab3
        },
        {
          title: 'Scheduled jobs',
          component: this.tab4
        }
      ]);
    }
  }
}
