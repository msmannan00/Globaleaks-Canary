import { Component } from '@angular/core';
import { NodeResolver } from 'app/src/shared/resolvers/node.resolver';

@Component({
  selector: 'src-admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  {

  constructor(public node : NodeResolver) {
  }
}
