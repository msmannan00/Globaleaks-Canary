import {Component, TemplateRef, ViewChild, AfterViewInit, ChangeDetectorRef} from "@angular/core";
import {Tab} from "@app/models/component-model/tab";
import {NodeResolver} from "@app/shared/resolvers/node.resolver";
import {CaseManagementTab1Component} from "@app/pages/admin/casemanagement/casemanagement-tab1/case-management-tab1.component";
import { FormsModule } from "@angular/forms";
import { NgbNav, NgbNavItem, NgbNavItemRole, NgbNavLinkButton, NgbNavLinkBase, NgbNavContent, NgbNavOutlet } from "@ng-bootstrap/ng-bootstrap";
import { NgFor, NgTemplateOutlet } from "@angular/common";
import { TranslatorPipe } from "@app/shared/pipes/translate";

@Component({
    selector: "src-casemanagement",
    templateUrl: "./case-management.component.html",
    standalone: true,
    imports: [FormsModule, NgbNav, NgFor, NgbNavItem, NgbNavItemRole, NgbNavLinkButton, NgbNavLinkBase, NgbNavContent, NgTemplateOutlet, NgbNavOutlet, CaseManagementTab1Component, TranslatorPipe]
})
export class CaseManagementComponent implements AfterViewInit {
  @ViewChild("tab1") tab1!: TemplateRef<CaseManagementTab1Component>;
  tabs: Tab[];
  nodeData: NodeResolver;
  active: string;

  constructor(protected node: NodeResolver, private cdr: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.active = "Report statuses";

      this.nodeData = this.node;
      this.tabs = [
        {
          id:"report_statuses",
          title: "Report statuses",
          component: this.tab1
        },
      ];

      this.cdr.detectChanges();
    });
  }
}
