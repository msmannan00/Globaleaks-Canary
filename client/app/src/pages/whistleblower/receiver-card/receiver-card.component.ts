import {Component, Input} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: "src-receiver-card",
  templateUrl: "./receiver-card.component.html"
})
export class ReceiverCardComponent {
  @Input() submission: any;
  @Input() receiver: any;

  constructor(protected translate: TranslateService) {
  }
  selectable(): boolean {
    if (this.submission.context.maximum_selectable_receivers === 0) {
      return true;
    }
  
    return Object.keys(this.submission.selected_receivers).length < this.submission.context.maximum_selectable_receivers;
  }
  
  switchSelection(receiver: any): void {
    if (!this.submission.selected_receivers[receiver.id]) {
      delete this.submission.selected_receivers[receiver.id];
    } else if (this.selectable()) {
      this.submission.selected_receivers[receiver.id] = true;
    }
  }
  
}
