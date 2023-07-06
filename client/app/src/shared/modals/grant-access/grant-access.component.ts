import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RecieverTipService } from 'app/src/services/recievertip.service';
import { UtilsService } from '../../services/utils.service';
import { Router } from '@angular/router';


@Component({
  selector: 'src-grant-access',
  templateUrl: './grant-access.component.html',
  styleUrls: ['./grant-access.component.css']
})
export class GrantAccessComponent {
  
  @Input() args: any;
  @Input() confirmFun: Function;
  @Input() cancelFun: Function;
  receiver_id: any;


  confirm(di:any) {
    if (this.confirmFun) {
      this.confirmFun(this.receiver_id);
    }
  }

  reload() {
    this.utils.reloadCurrentRoute();
  }

  cancel() {
    if (this.cancelFun) {
      this.cancelFun();
    }
    this.modalService.dismissAll();
  }

  constructor(
    private modalService: NgbModal,
    public tipsService: RecieverTipService,
    public http: HttpClient,
    public utils: UtilsService,
    public router: Router
  ) {
  }
}
