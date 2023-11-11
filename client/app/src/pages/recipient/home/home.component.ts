import {Component} from "@angular/core";
import {AppDataService} from "@app/app-data.service";

@Component({
  selector: "src-recipient-home",
  templateUrl: "./home.component.html"
})
export class HomeComponent {
  constructor(private appDataService:AppDataService) {
    this.appDataService.updateShowLoadingPanel(false);
  }
}
