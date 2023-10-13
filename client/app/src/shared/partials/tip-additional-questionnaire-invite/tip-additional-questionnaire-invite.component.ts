import {Component} from "@angular/core";
import {UtilsService} from "../../services/utils.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {
  TipAdditionalQuestionnaireFormComponent
} from "../../modals/tip-additional-questionnaire-form/tip-additional-questionnaire-form.component";

@Component({
  selector: "src-tip-additional-questionnaire-invite",
  templateUrl: "./tip-additional-questionnaire-invite.component.html"
})
export class TipAdditionalQuestionnaireInviteComponent {
  collapsed = false;

  public toggleColLapse() {
    this.collapsed = !this.collapsed;
  }

  constructor(public utilsService: UtilsService, private modalService: NgbModal) {
  }

  tip_open_additional_questionnaire() {
    this.modalService.open(TipAdditionalQuestionnaireFormComponent, {windowClass: "custom-modal-width"});
  }
}
