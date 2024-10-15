import {Component, Input} from "@angular/core";
import {UtilsService} from "@app/shared/services/utils.service";
import {WbtipService} from "@app/services/helper/wbtip.service";
import {ReceiverTipService} from "@app/services/helper/receiver-tip.service";
import { NgIf, NgFor } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { TranslatorPipe } from "@app/shared/pipes/translate";

@Component({
    selector: "src-tip-receiver-list",
    templateUrl: "./tip-receiver-list.component.html",
    standalone: true,
    imports: [NgIf, NgFor, TranslateModule, TranslatorPipe]
})
export class TipReceiverListComponent {
  collapsed = false;
  @Input() tipService: ReceiverTipService | WbtipService;

  constructor(protected utilsService: UtilsService) {
  }

  public toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

}
