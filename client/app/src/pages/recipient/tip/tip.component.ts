import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteConfirmationComponent } from 'app/src/shared/modals/delete-confirmation/delete-confirmation.component';
import { GrantAccessComponent } from 'app/src/shared/modals/grant-access/grant-access.component';
import { RevokeAccessComponent } from 'app/src/shared/modals/revoke-access/revoke-access.component';
import { PreferenceResolver } from 'app/src/shared/resolvers/preference.resolver';
import { RtipsResolver } from 'app/src/shared/resolvers/rtips.resolver';
import { UtilsService } from 'app/src/shared/services/utils.service';


@Component({
  selector: 'src-tip',
  templateUrl: './tip.component.html',
  styleUrls: ['./tip.component.css']
})
export class TipComponent {
  
  fieldUtilities: any;
  tip_id: string | null;
  itemsPerPage: number = 5;
  currentCommentsPage: number = 1;
  currentMessagesPage: number = 1;
  answers: any = {};
  uploads: any = {};

  //

  // tip: any;
  


  set_reminder(){}
  tip_postpone(){}
  exportTip(tip:any){}
  // tipToggleStar(): Promise<void> {
  //   return this.tip.operation('set', { key: 'important', value: !this.tip.important })
  //     .then(() => {
  //       this.tip.important = !this.tip.important;
  //     });
  // }
  // tipNotify(enable: boolean): Promise<void> {
  //   return this.tip.operation('set', { key: 'enable_notifications', value: enable })
  //     .then(() => {
  //       this.tip.enable_notifications = enable;
  //     });
  // }
  openGrantTipAccessModal(){
    alert('Alert from outside');

    this.utils.runUserOperation("get_users_names", {}, true).subscribe(
        {
          next: response => {
            const modalRef = this.modalService.open(GrantAccessComponent);
            modalRef.componentInstance.users_names = response;
            modalRef.componentInstance.confirmFun = (receiver_id: any) => {
              const args = {
                receiver: receiver_id
              };
              return this.utils.runRecipientOperation("grant", args, true);
            };
          },
          error: (error: any) => {
            alert(JSON.stringify(error));
          }
        }
    );
  }

  openRevokeTipAccessModal(){
    this.utils.runUserOperation("get_users_names", {}, true).subscribe(
      {
        next: response => {
          const modalRef = this.modalService.open(RevokeAccessComponent);
          modalRef.componentInstance.users_names = response;
          modalRef.componentInstance.confirmFun = (receiver_id: any) => {
            const args = {
              receiver: receiver_id
            };
            return this.utils.runRecipientOperation("revoke", args, true);
          };
        },
        error: (error: any) => {
          alert(JSON.stringify(error));
        }
      }
    );
  }  
  // tipDelete(){
  //   const modalRef = this.modalService.open(DeleteConfirmationComponent);
  //   modalRef.componentInstance.tip = this.tip;
  //   modalRef.componentInstance.operation = "delete";
  // } 
    reload(): void {
     this.utils.reloadCurrentRoute()
    }
 
  preprocessTipAnswers(tip: any) {
    throw new Error('Method not implemented.');
  }
  ngOnInit(){
    // this.fieldUtilities = fieldUtilities;
    this.tip_id = this.route.snapshot.paramMap.get('tip_id');

  }

  constructor(
    public utils:UtilsService,
    public preferencesService:PreferenceResolver,
    public modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private rtips:RtipsResolver
     ) {
  }
}
