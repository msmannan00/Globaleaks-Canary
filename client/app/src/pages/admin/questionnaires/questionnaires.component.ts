import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NodeResolver } from 'app/src/shared/resolvers/node.resolver';

@Component({
  selector: 'src-questionnaires',
  templateUrl: './questionnaires.component.html',
  styleUrls: ['./questionnaires.component.css']
})
export class QuestionnairesComponent implements AfterViewInit, OnInit {
  @ViewChild('tab1') tab1!: TemplateRef<any>;
  @ViewChild('tab2') tab2!: TemplateRef<any>;
  tabs: any[];
  nodeData: any
  active: string

  constructor(public node: NodeResolver) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.active = "Questionnaires"

    this.nodeData = this.node
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

  }
}
