import { Component, TemplateRef, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { NodeResolver } from 'app/src/shared/resolvers/node.resolver';

@Component({
  selector: 'src-questionnaires',
  templateUrl: './questionnaires.component.html',
  styleUrls: ['./questionnaires.component.css']
})
export class QuestionnairesComponent implements OnInit, AfterViewInit {
  @ViewChild('tab1') tab1!: TemplateRef<any>;
  @ViewChild('tab2') tab2!: TemplateRef<any>;
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
      this.active = "Questionnaires";

      this.nodeData = this.node;
      this.tabs = [
        {
          title: 'Questionnaires',
          component: this.tab1
        },
        {
          title: 'Question templates',
          component: this.tab2
        },
      ];

      this.cdr.detectChanges();
    });
  }
}
