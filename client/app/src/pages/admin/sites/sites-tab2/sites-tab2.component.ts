import { Component } from '@angular/core';
import {AppDataService} from "../../../../app-data.service";
import {UtilsService} from "../../../../shared/services/utils.service";
import {NodeResolver} from "../../../../shared/resolvers/node.resolver";

@Component({
  selector: 'src-sites-tab2',
  templateUrl: './sites-tab2.component.html'
})
export class SitesTab2Component {

  constructor(public nodeResolver:NodeResolver, public utilsService:UtilsService) {

  }


}
