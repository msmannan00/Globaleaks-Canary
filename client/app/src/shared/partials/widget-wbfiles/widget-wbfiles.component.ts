import {Component, Input} from '@angular/core';
import {WBTipData} from "../../../models/whistleblower/WBTipData";
import {WbtipService} from "../../../services/wbtip.service";
import {UtilsService} from "../../services/utils.service";

@Component({
  selector: 'src-widget-wbfiles',
  templateUrl: './widget-wbfiles.component.html',
  styleUrls: ['./widget-wbfiles.component.css']
})
export class WidgetWbfilesComponent {

  @Input() index:any
  collapsed = false;
  submission={}

  public toggleColapse(){
    this.collapsed = !this.collapsed
  }

  constructor(public wbtipService:WbtipService, public utilsService:UtilsService) {
  }

}
