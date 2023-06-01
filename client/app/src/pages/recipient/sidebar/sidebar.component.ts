import { Component } from '@angular/core';
import { PreferenceResolver } from 'app/src/shared/resolvers/preference.resolver';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'src-receipt-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  {
  message: string;

  constructor(public preferenceResolver: PreferenceResolver) {
  }
 
}
