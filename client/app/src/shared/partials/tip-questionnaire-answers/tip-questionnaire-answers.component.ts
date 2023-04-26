import { Component } from '@angular/core';
import {UtilsService} from "../../services/utils.service";
import {WbtipService} from "../../../services/wbtip.service";
import {filter} from "rxjs";

@Component({
  selector: 'src-tip-questionnaire-answers',
  templateUrl: './tip-questionnaire-answers.component.html',
  styleUrls: ['./tip-questionnaire-answers.component.css']
})
export class TipQuestionnaireAnswersComponent {
  collapsed = false
  public toggleColapse(){
    this.collapsed = !this.collapsed
  }
  constructor(public utilsService:UtilsService, public wbtipService:WbtipService) {
  }

}
