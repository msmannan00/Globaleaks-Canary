import {Component, OnInit} from '@angular/core';
import {IarsResolver} from "../../../shared/resolvers/iars.resolver";
import {UtilsService} from "../../../shared/services/utils.service";
import {HttpService} from "../../../shared/services/http.service";
import {RequestSupportComponent} from "../../../shared/modals/request-support/request-support.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {
  TipOperationFileIdentityAccessRequestComponent
} from "../../../shared/modals/tip-operation-file-identity-access-request/tip-operation-file-identity-access-request.ompoent";
import {
  TipOperationFileIdentityAccessReplyComponent
} from "../../../shared/modals/tip-operation-file-identity-access-reply/tip-operation-file-identity-access-reply.component";

@Component({
  selector: 'src-identity-access-requests',
  templateUrl: './identity-access-requests.component.html'
})
export class IdentityAccessRequestsComponent implements OnInit{

  constructor(private modalService: NgbModal, private httpService: HttpService, public iarsResolver:IarsResolver, public utilsService:UtilsService) {
  }

  ngOnInit(): void {
  }

  authorize_identity_access_request(iar_id:string){
    this.httpService.authorizeIdentity("api/custodian/iars/" + iar_id, {"reply": "authorized", "reply_motivation": ""}).subscribe(
      {
        next: () => {
          this.utilsService.reloadCurrentRoute()
        }
      }
    );
  }

  file_denied_identity_access_reply(iar_id:string){
    const modalRef = this.modalService.open(TipOperationFileIdentityAccessReplyComponent);
    modalRef.componentInstance.iar_id = iar_id
  }

}
