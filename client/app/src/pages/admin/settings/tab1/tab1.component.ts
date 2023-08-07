import { Component, Input } from '@angular/core';
import { NodeResolver } from 'app/src/shared/resolvers/node.resolver';

@Component({
  selector: 'src-tab1',
  templateUrl: './tab1.component.html',
  styleUrls: ['./tab1.component.css']
})
export class Tab1Component {
  // @Input() node: NodeResolver;
  constructor(public node:NodeResolver) { }

  ngOnInit(): void {
    console.log(this.node,"node");
    
  
  }

  updateNode(): void {
   
  }
}
