import {Component, Input} from "@angular/core";
import {UtilsService} from "../../services/utils.service";
import {WbtipService} from "@app/services/wbtip.service";
import {RecieverTipService} from "app/src/services/recievertip.service";

@Component({
  selector: "src-tip-questionnaire-answers",
  templateUrl: "./tip-questionnaire-answers.component.html"
})
export class TipQuestionnaireAnswersComponent {
  @Input() tipService: RecieverTipService | WbtipService;
  collapsed = false;

  constructor(public utilsService: UtilsService) {
  }

  public toggleCollapse() {
    this.collapsed = !this.collapsed;
  }
}
