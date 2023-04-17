import { Component } from '@angular/core';
import {AppDataService} from "../../../app-data.service";
import {UtilsService} from "../../services/utils.service";

@Component({
  selector: 'src-privacybadge',
  templateUrl: './privacybadge.component.html',
  styleUrls: ['./privacybadge.component.css']
})
export class PrivacybadgeComponent {
  constructor(public appDataService: AppDataService, public utilsService: UtilsService) {
  }

}
