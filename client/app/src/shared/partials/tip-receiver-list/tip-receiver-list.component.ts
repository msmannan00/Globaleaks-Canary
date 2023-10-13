import {Component, Input} from "@angular/core";
import {UtilsService} from "../../services/utils.service";
import {WbtipService} from "@app/services/wbtip.service";
import {RecieverTipService} from "app/src/services/recievertip.service";

@Component({
  selector: "src-tip-receiver-list",
  templateUrl: "./tip-receiver-list.component.html"
})
export class TipReceiverListComponent {
  collapsed = false;
  @Input() tipService: RecieverTipService | WbtipService;

  constructor(public utilsService: UtilsService) {
  }

  public toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

}
