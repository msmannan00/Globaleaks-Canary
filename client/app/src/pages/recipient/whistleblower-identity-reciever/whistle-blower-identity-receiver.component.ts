import {Component} from "@angular/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {RecieverTipService} from "app/src/services/recievertip.service";
import {
  TipOperationFileIdentityAccessRequestComponent
} from "app/src/shared/modals/tip-operation-file-identity-access-request/tip-operation-file-identity-access-request.ompoent";
import {HttpService} from "app/src/shared/services/http.service";
import {UtilsService} from "app/src/shared/services/utils.service";


@Component({
  selector: "src-whistleblower-identity-reciever",
  templateUrl: "./whistle-blower-identity-receiver.component.html"
})
export class WhistleBlowerIdentityReceiverComponent {
  collapsed: boolean = true;

  constructor(public tipService: RecieverTipService, public utilsService: UtilsService, private httpService: HttpService, private modalService: NgbModal, private utils: UtilsService) {
  }

  public toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

  file_identity_access_request() {
    const modalRef = this.modalService.open(TipOperationFileIdentityAccessRequestComponent);
    modalRef.componentInstance.tip = this.tipService.tip;
  }

  access_identity() {
    return this.httpService.accessIdentity(this.tipService.tip.id).subscribe(
      _ => {
        this.utils.reloadCurrentRoute();
      }
    );
  }
}
