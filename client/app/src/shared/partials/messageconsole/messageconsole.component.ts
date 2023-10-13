import {AfterViewChecked, Component, OnDestroy} from "@angular/core";
import {AppDataService} from "@app/app-data.service";
import {errorCodes} from "@app/models/app/error-code";

@Component({
  selector: "messageconsole",
  templateUrl: "./messageconsole.component.html"
})
export class MessageconsoleComponent implements AfterViewChecked {
  private timeoutId: any;
  private timeoutRunning: boolean = false;

  constructor(public appDataService: AppDataService) {
  }

  dismissError() {
    clearTimeout(this.timeoutId);
    this.timeoutRunning = false;
    this.appDataService.errorCodes = new errorCodes();
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
