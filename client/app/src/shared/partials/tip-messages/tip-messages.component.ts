import { Component, Input } from '@angular/core';
import {UtilsService} from "../../services/utils.service";
import {WbtipService} from "../../../services/wbtip.service";
import {AuthenticationService} from "../../../services/authentication.service";
import { RecieverTipService } from 'app/src/services/recievertip.service';

@Component({
  selector: 'src-tip-messages',
  templateUrl: './tip-messages.component.html',
  styleUrls: ['./tip-messages.component.css']
})
export class TipMessagesComponent {
  @Input() tipService: RecieverTipService | WbtipService  ;

  collapsed = false;
  newMessageContent = ""
  currentMessagesPage: number = 1;
  itemsPerPage = 5;

  public toggleColapse(){
    this.collapsed = !this.collapsed
  }

  constructor(public utilsService:UtilsService, public authenticationService:AuthenticationService) {
  }

  newMessage() {
    this.tipService.newMessages(this.newMessageContent);
    this.newMessageContent = "";
  }

  protected readonly JSON = JSON;
}
