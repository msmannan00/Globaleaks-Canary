import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RecieverTipService } from 'app/src/services/recievertip.service';
import { UtilsService } from '../../services/utils.service';
import { Router } from '@angular/router';
import { AppDataService } from 'app/src/app-data.service';


@Component({
  selector: 'src-revoke-access',
  templateUrl: './revoke-access.component.html',
  styleUrls: ['./revoke-access.component.css']
})
export class RevokeAccessComponent {
  
  
  @Input() args: any;
  @Input() confirmFun: Function;
  @Input() cancelFun: Function;
  receiver_id: any;
  receivers_by_id:any={}
  ngOnInit() {
    this.receivers_by_id =this.appDataService.receivers_by_id
  }

  confirm(di:any) {
    this.cancel()
    if (this.confirmFun) {
      this.confirmFun(this.receiver_id);
    }
  }

  reload() {
    this.utils.reloadCurrentRoute();alert("xx12");
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
    public router: Router,
    public appDataService: AppDataService,
  ) {
  }
}
