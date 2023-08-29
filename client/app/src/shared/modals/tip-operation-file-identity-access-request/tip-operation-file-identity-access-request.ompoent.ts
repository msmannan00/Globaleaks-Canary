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

  

  confirm() {
      this.modalService.dismissAll();
    this.http.post("api/rtips/" + this.tipsService.tip.id + "/iars", {"request_motivation": this.request_motivation})
    .subscribe(
      response => {
        this.utils.reloadCurrentRoute();
      },
      error => {
        console.error(error);
      }
    );
  }
  reload() {
    this.utils.reloadCurrentRoute();
  }

  cancel() {
      this.modalService.dismissAll();
  }
  ngOnInit(){
  }

  constructor(private modalService: NgbModal,public tipsService:RecieverTipService,public http:HttpClient, public utils: UtilsService) {
  }
}
