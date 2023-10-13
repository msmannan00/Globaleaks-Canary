import {Component, Input} from "@angular/core";
import {UtilsService} from "../../services/utils.service";
import {AppDataService} from "../../../app-data.service";
import {Transfer} from "@flowjs/ngx-flow";

@Component({
  selector: "src-rfile-upload-status",
  templateUrl: "./rfile-upload-status.component.html"
})
export class RfileUploadStatusComponent {
  @Input() file: Transfer;
  @Input() formuploader: boolean;

  constructor(public utilsService: UtilsService, public appDataService: AppDataService) {
  }
}
