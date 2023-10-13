import {Component, Input, OnInit} from "@angular/core";
import {UtilsService} from "../../services/utils.service";
import {WbtipService} from "@app/services/wbtip.service";

@Component({
  selector: "src-tip-files-whistleblower",
  templateUrl: "./tip-files-whistleblower.component.html"
})
export class TipFilesWhistleblowerComponent implements OnInit {
  @Input() fileUploadUrl: any;
  collapsed = false;

  constructor(public utilsService: UtilsService, public wbTipService: WbtipService) {
  }

  public toggleColLapse() {
    this.collapsed = !this.collapsed;
  }

  ngOnInit(): void {
  }

}
