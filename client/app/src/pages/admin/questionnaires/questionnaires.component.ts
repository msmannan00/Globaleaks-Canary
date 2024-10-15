import {Component, TemplateRef, ViewChild, AfterViewInit, ChangeDetectorRef} from "@angular/core";
import {Tab} from "@app/models/component-model/tab";
import {NodeResolver} from "@app/shared/resolvers/node.resolver";
import {MainComponent} from "@app/pages/admin/questionnaires/main/main.component";
import {QuestionsComponent} from "@app/pages/admin/questionnaires/questions/questions.component";
import { NgbNav, NgbNavItem, NgbNavItemRole, NgbNavLinkButton, NgbNavLinkBase, NgbNavContent, NgbNavOutlet } from "@ng-bootstrap/ng-bootstrap";
import { NgFor, NgTemplateOutlet } from "@angular/common";
import { MainComponent as MainComponent_1 } from "./main/main.component";
import { QuestionsComponent as QuestionsComponent_1 } from "./questions/questions.component";
import { TranslatorPipe } from "@app/shared/pipes/translate";
import { TranslateModule } from "@ngx-translate/core";

@Component({
    selector: "src-questionnaires",
    templateUrl: "./questionnaires.component.html",
    standalone: true,
    imports: [NgbNav, NgFor, NgbNavItem, NgbNavItemRole, NgbNavLinkButton, NgbNavLinkBase, NgbNavContent, NgTemplateOutlet, NgbNavOutlet, MainComponent_1, QuestionsComponent_1, TranslatorPipe, TranslateModule]
})
export class QuestionnairesComponent implements AfterViewInit {
  @ViewChild("tab1") tab1!: TemplateRef<MainComponent>;
  @ViewChild("tab2") tab2!: TemplateRef<QuestionsComponent>;
  tabs: Tab[];
  nodeData: NodeResolver;
  active: string;

  constructor(protected node: NodeResolver, private cdr: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.active = "Questionnaires";

      this.nodeData = this.node;
      this.tabs = [
        {
          id:"questionnaires",
          title: "Questionnaires",
          component: this.tab1
        },
        {
          id:"question_templates",
          title: "Question templates",
          component: this.tab2
        },
      ];

      this.cdr.detectChanges();
    });
  }
}