import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppDataService } from 'app/src/app-data.service';
import { RecieverTipData } from 'app/src/models/reciever/RecieverTipData';
import { ResolverTipService } from 'app/src/services/resolvertip.service';
import { DeleteConfirmationComponent } from 'app/src/shared/modals/delete-confirmation/delete-confirmation.component';
import { GrantAccessComponent } from 'app/src/shared/modals/grant-access/grant-access.component';
import { RevokeAccessComponent } from 'app/src/shared/modals/revoke-access/revoke-access.component';
import { PreferenceResolver } from 'app/src/shared/resolvers/preference.resolver';
import { RtipsResolver } from 'app/src/shared/resolvers/rtips.resolver';
import { HttpService } from 'app/src/shared/services/http.service';
import { UtilsService } from 'app/src/shared/services/utils.service';
import { Observable } from 'rxjs';


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
  tip: any;
  contexts_by_id: any;
  Utils: any;
  submission_statuses: any;
  supportedViewTypes: string[];
  score: any;
  ctx: string;
  submission: {};
  fileupload_url: string;
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
    this.tip_id = this.activatedRoute.snapshot.paramMap.get('tip_id');
    let requestObservable:Observable<any> = this.httpService.recieverTip({},this.tip_id)
    requestObservable.subscribe(
        {
          next: (response:RecieverTipData) => {
            alert(JSON.stringify(response))

            this.resolverTipService.initialize(response)
            this.tip = this.resolverTipService.tip;

            this.activatedRoute.queryParams.subscribe((params: { [x: string]: any; }) => {
              this.tip.tip_id = params['tip_id']
            });

            this.fileupload_url = "api/wbtip/rfile";
            this.tip.context = this.appDataService.contexts_by_id[this.tip.context_id];

            this.tip.receivers_by_id = this.utilsService.array_to_map(this.tip.receivers);
            this.score = this.tip.score;
            this.ctx = "wbtip";
            this.preprocessTipAnswers(this.tip);

            this.tip.submissionStatusStr = this.utilsService.getSubmissionStatusText(this.tip.status, this.tip.substatus, this.appDataService.submission_statuses)
            this.submission = {};
            // this.submission._submission = this.tip;
            if (this.tip.receivers.length === 1 && this.tip.msg_receiver_selected === null) {
              this.tip.msg_receiver_selected = this.tip.msg_receivers_selector[0].key;
            }
          },
          error: (error: any) => {
          }
        }
    )
  }

  tipToggleStar(){}
  tipNotify(b:boolean){}
  tipDelete(){}
  

  constructor(
    public utils:UtilsService,
    public preferencesService:PreferenceResolver,
    public modalService: NgbModal,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private rtips:RtipsResolver,
    public httpService:HttpService,
    public appDataService:AppDataService,
    public utilsService:UtilsService,
    public resolverTipService:ResolverTipService
     ) {
  }
}
