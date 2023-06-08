import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RecieverTipService } from 'app/src/services/recievertip.service';
import { TipOperationFileIdentityAccessRequestComponent } from 'app/src/shared/modals/tip-operation-file-identity-access-request/tip-operation-file-identity-access-request.ompoent';
import { FieldUtilitiesService } from 'app/src/shared/services/field-utilities.service';
import { HttpService } from 'app/src/shared/services/http.service';
import { UtilsService } from 'app/src/shared/services/utils.service';
import { tap } from 'rxjs';


@Component({
  selector: 'src-whistleblower-identity-reciever',
  templateUrl: './whistleblower-identity-reciever.component.html',
  styleUrls: ['./whistleblower-identity-reciever.component.css']
})
export class WhistleBlowerIdentityRecieverComponent {
  collapsed:boolean=true;
  public toggleColapse(){
    this.collapsed = !this.collapsed
  }
  file_identity_access_request(){
    const modalRef = this.modalService.open(TipOperationFileIdentityAccessRequestComponent);
    modalRef.componentInstance.tip = this.tipService.tip;
  }
  access_identity(){
   return this.httpService.accessIdentity(this.tipService.tip.id).subscribe(
      response => {
        this.utils.reloadCurrentRoute();
      },
      error => {
        console.error(error);
      }
    );
  }
  constructor(
    public tipService:RecieverTipService, 
    public utilsService:UtilsService, 
    public fieldUtilitiesService:FieldUtilitiesService,
    public httpService:HttpService,
    public modalService:NgbModal,
    public utils:UtilsService
    ) {
    // this.collapsed = this.tipService.tip.data.whistleblower_identity_provided
  }

  ngOnInit(){
   
  }
}
