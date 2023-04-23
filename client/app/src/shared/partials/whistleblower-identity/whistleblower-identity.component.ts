import { Component } from '@angular/core';
import {WbtipService} from "../../../services/wbtip.service";
import {UtilsService} from "../../services/utils.service";
import {orderBy} from "lodash";

@Component({
  selector: 'src-whistleblower-identity',
  templateUrl: './whistleblower-identity.component.html',
  styleUrls: ['./whistleblower-identity.component.css']
})
export class WhistleblowerIdentityComponent {
  collapsed = false;
  submission = {}
  protected readonly JSON = JSON;

  public toggleColapse(){
    this.collapsed = !this.collapsed
  }

  constructor(public wbtipService:WbtipService, public utilsService:UtilsService) {
    this.collapsed = this.wbtipService.tip.data.whistleblower_identity_provided
  }

    provideIdentityInformation(id:any, answers: any) {

    }
}
