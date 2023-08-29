import { Component, Input } from '@angular/core';
import {UtilsService} from "../../services/utils.service";
import {WbtipService} from "../../../services/wbtip.service";
import {filter} from "rxjs";
import { RecieverTipService } from 'app/src/services/recievertip.service';

@Component({
  selector: 'src-tip-questionnaire-answers',
  templateUrl: './tip-questionnaire-answers.component.html',
  styleUrls: ['./tip-questionnaire-answers.component.css']
})
export class TipQuestionnaireAnswersComponent {
  @Input() tipService: RecieverTipService | WbtipService  ;
  collapsed = false;
  public toggleColapse(){
    this.collapsed = !this.collapsed
  }
  constructor(public utilsService:UtilsService) {
  }

  protected readonly JSON = JSON;
  protected readonly alert = alert;
}
