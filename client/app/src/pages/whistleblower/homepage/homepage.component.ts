import { Component } from '@angular/core';
import {AppConfigService} from "../../../services/app-config.service";
import {AppDataService} from "../../../app-data.service";

@Component({
  selector: 'src-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  constructor(public appDataService: AppDataService) {
  }

    openSubmission() {

    }
}
