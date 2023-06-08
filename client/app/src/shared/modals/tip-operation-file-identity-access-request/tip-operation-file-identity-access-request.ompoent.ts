import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RecieverTipService } from 'app/src/services/recievertip.service';
import { finalize } from 'rxjs';
import { UtilsService } from '../../services/utils.service';


@Component({
  selector: 'src-tip-operation-file-identity-access-request',
  templateUrl: './tip-operation-file-identity-access-request.component.html',
  styleUrls: ['./tip-operation-file-identity-access-request.component.css']
})
export class TipOperationFileIdentityAccessRequestComponent {
  request_motivation:any;
  modal: NgbModalRef;

  openModal(content: any) {
    this.modal = this.modalService.open(content);
  }

  confirm() {
    if (this.modal) {
      this.modal.dismiss();
    }
    return this.http.post("api/rtips/" + this.tipsService.tip.id + "/iars", { "request_motivation": this.request_motivation })
    .pipe(
      finalize(() => {
        this.reload();
      })
    );
  }
  reload() {
    this.utils.reloadCurrentRoute();
  }

  cancel() {
    if (this.modal) {
      this.modal.dismiss();
    }
  }
  ngOnInit(){
  }

  constructor(private modalService: NgbModal,public tipsService:RecieverTipService,public http:HttpClient, public utils: UtilsService) {
  }
}
