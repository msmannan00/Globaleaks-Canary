import {Component, Input} from "@angular/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpService} from "@app/shared/services/http.service";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { TranslatorPipe } from "@app/shared/pipes/translate";

@Component({
    selector: "src-tip-operation-file-identity-access-reply",
    templateUrl: "./tip-operation-file-identity-access-reply.component.html",
    standalone: true,
    imports: [FormsModule, TranslateModule, TranslatorPipe]
})
export class TipOperationFileIdentityAccessReplyComponent {

  reply_motivation = "";
  @Input() iar_id = "";

  constructor(private httpService: HttpService, private modalService: NgbModal) {
  }

  cancel() {
    this.modalService.dismissAll();
  }

  confirmFunction: () => void;

  confirm() {
    this.httpService.authorizeIdentity("api/custodian/iars/" + this.iar_id, {
      "reply": "denied",
      "reply_motivation": this.reply_motivation
    }).subscribe(
      {
        next: () => {
          this.confirmFunction();
        }
      }
    );
    this.cancel();
  }
}
