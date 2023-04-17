import { Component } from '@angular/core';
import {AppDataService} from "../../../app-data.service";
import {UtilsService} from "../../services/utils.service";

@Component({
  selector: 'src-privacybadge',
  templateUrl: './privacybadge.component.html',
  styleUrls: ['./privacybadge.component.css']
})
export class PrivacybadgeComponent {
  public markdown: string;
  constructor(public appDataService: AppDataService, public utilsService: UtilsService) {
    this.markdown = appDataService.public.node.custom_privacy_badge_text
  }

}
