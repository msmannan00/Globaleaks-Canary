import { Component, Input } from '@angular/core';
import {UtilsService} from "../../services/utils.service";
import {WbtipService} from "../../../services/wbtip.service";
import { RecieverTipService } from 'app/src/services/recievertip.service';

@Component({
  selector: 'src-tip-receiver-list',
  templateUrl: './tip-receiver-list.component.html',
  styleUrls: ['./tip-receiver-list.component.css']
})
export class TipReceiverListComponent {
  collapsed = false;
  @Input() tipService: RecieverTipService | WbtipService  ;

  public toggleColapse(){
    this.collapsed = !this.collapsed
  }

  constructor(public utilsService:UtilsService) {
  }

}
