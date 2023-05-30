import { Component } from '@angular/core';
import { PreferenceResolver } from 'app/src/shared/resolvers/preference.resolver';

@Component({
  selector: 'src-receipt-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  {
  message: string;

  constructor() {
  }

 
}
