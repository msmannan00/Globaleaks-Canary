import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NodeResolver } from 'app/src/shared/resolvers/node.resolver';

@Component({
  selector: 'src-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class adminHomeComponent {
  active:any=0
  constructor(public node : NodeResolver,private translateService: TranslateService,private router: Router){

  }
  isActive(route: string): boolean {
    return this.router.isActive(route, false);
  }
}
