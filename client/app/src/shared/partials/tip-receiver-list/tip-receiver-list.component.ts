import { Component } from '@angular/core';
import {UtilsService} from "../../services/utils.service";
import {WbtipService} from "../../../services/wbtip.service";

@Component({
  selector: 'src-tip-receiver-list',
  templateUrl: './tip-receiver-list.component.html',
  styleUrls: ['./tip-receiver-list.component.css']
})
export class TipReceiverListComponent {
  collapsed = false;

  public toggleColapse(){
    this.collapsed = !this.collapsed
  }

  constructor(public utilsService:UtilsService,public  wbtipService:WbtipService) {
  }

}
