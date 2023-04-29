import {Component, Input} from '@angular/core';
import {UtilsService} from "../../services/utils.service";
import {AppDataService} from "../../../app-data.service";
import {Transfer} from "@flowjs/ngx-flow";
import {Subscription} from "rxjs";

@Component({
  selector: 'src-rfile-upload-status',
  templateUrl: './rfile-upload-status.component.html',
  styleUrls: ['./rfile-upload-status.component.css']
})
export class RfileUploadStatusComponent {
  @Input() file:Transfer
  constructor(public utilsService:UtilsService, public appDataService:AppDataService) {
  }

  protected readonly alert = alert;
  protected readonly JSON = JSON;
}
