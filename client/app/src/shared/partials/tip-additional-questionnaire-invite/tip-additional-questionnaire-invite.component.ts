import { Component } from '@angular/core';
import {UtilsService} from "../../services/utils.service";

@Component({
  selector: 'src-tip-additional-questionnaire-invite',
  templateUrl: './tip-additional-questionnaire-invite.component.html',
  styleUrls: ['./tip-additional-questionnaire-invite.component.css']
})
export class TipAdditionalQuestionnaireInviteComponent {
  collapsed = false;

  public toggleColapse(){
    this.collapsed = !this.collapsed
  }

  constructor(public utilsService:UtilsService) {
  }

  tip_open_additional_questionnaire() {
    this.utilsService.openSupportModal()

  }
}
