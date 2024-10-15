import {AfterViewChecked, Component} from "@angular/core";
import {AppDataService} from "@app/app-data.service";
import {ErrorCodes} from "@app/models/app/error-code";
import { NgIf, NgSwitch, NgSwitchCase } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { TranslatorPipe } from "@app/shared/pipes/translate";

@Component({
    selector: "messageconsole",
    templateUrl: "./message-console.component.html",
    standalone: true,
    imports: [NgIf, NgSwitch, NgSwitchCase, TranslateModule, TranslatorPipe]
})
export class MessageConsoleComponent implements AfterViewChecked {
  private timeoutId: any;
  private timeoutRunning: boolean = false;

  constructor(public appDataService: AppDataService) {
  }

  dismissError() {
    clearTimeout(this.timeoutId);
    this.timeoutRunning = false;
    this.appDataService.errorCodes = new ErrorCodes();
  }

  ngAfterViewChecked(): void {
    if (!this.timeoutRunning && this.appDataService.errorCodes.code !== -1) {
      this.timeoutRunning = true;
      this.timeoutId = setTimeout(() => {
        this.dismissError();
      }, 3000);
    }
  }
}
