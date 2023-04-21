import { Component } from '@angular/core';
import {UtilsService} from "../../services/utils.service";
import {WbtipService} from "../../../services/wbtip.service";
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'src-tip-messages',
  templateUrl: './tip-messages.component.html',
  styleUrls: ['./tip-messages.component.css']
})
export class TipMessagesComponent {
  collapsed = false;

  public toggleColapse(){
    this.collapsed = !this.collapsed
  }

  constructor(public utilsService:UtilsService, public wbtipService:WbtipService, public authenticationService:AuthenticationService) {
  }

  newMessage() {

  }
}
