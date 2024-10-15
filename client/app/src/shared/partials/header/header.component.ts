import {Component} from "@angular/core";
import {AppConfigService} from "@app/services/root/app-config.service";
import {AppDataService} from "@app/app-data.service";
import { NgIf } from "@angular/common";
import { UserComponent } from "./template/user/user.component";
import { TranslateModule } from "@ngx-translate/core";
import { TranslatorPipe } from "@app/shared/pipes/translate";

@Component({
    selector: "views-header",
    templateUrl: "./header.component.html",
    standalone: true,
    imports: [NgIf, UserComponent, TranslateModule, TranslatorPipe]
})
export class HeaderComponent {
  constructor(public appConfig: AppConfigService, public appDataService: AppDataService) {
  }
}
