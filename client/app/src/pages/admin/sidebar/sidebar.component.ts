import { Component } from '@angular/core';
import { NodeResolver } from 'app/src/shared/resolvers/node.resolver';
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'src-admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  {

  constructor(public node : NodeResolver, public authenticationService:AuthenticationService) {
  }
}
