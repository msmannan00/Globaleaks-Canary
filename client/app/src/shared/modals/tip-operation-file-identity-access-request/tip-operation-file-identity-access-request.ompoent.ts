import {HttpClient} from '@angular/common/http';
import {Component} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {RecieverTipService} from 'app/src/services/recievertip.service';
import {UtilsService} from '../../services/utils.service';


@Component({
  selector: 'src-tip-operation-file-identity-access-request',
  templateUrl: './tip-operation-file-identity-access-request.component.html'
})
export class TipOperationFileIdentityAccessRequestComponent {
  request_motivation: any;
  modal: NgbModalRef;

  constructor(private modalService: NgbModal, private tipsService: RecieverTipService, private http: HttpClient, private utils: UtilsService) {
  }

  confirm() {
    this.modalService.dismissAll();
    this.http.post("api/recipient/rtips/" + this.tipsService.tip.id + "/iars", {"request_motivation": this.request_motivation})
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

  ngOnInit() {
  }

}
