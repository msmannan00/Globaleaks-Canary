import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteConfirmationComponent } from 'app/src/shared/modals/delete-confirmation/delete-confirmation.component';
import { GrantAccessComponent } from 'app/src/shared/modals/grant-access/grant-access.component';
import { RevokeAccessComponent } from 'app/src/shared/modals/revoke-access/revoke-access.component';
import { FilterPipe } from 'app/src/shared/pipes/filter.pipe';
import { PreferenceResolver } from 'app/src/shared/resolvers/preference.resolver';
import { RtipsResolver } from 'app/src/shared/resolvers/rtips.resolver';
import { HttpService } from 'app/src/shared/services/http.service';
import { UtilsService } from 'app/src/shared/services/utils.service';


@Component({
  selector: 'src-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.css']
})
export class TipsComponent {
  search:string | undefined;
  selected_tips: any[] = [];
  filteredTips: any[] = [];
  // filteredTips: any[] = this.filterPipe.transform(this.rtips.dataModel.rtips, "update_date",'');
  currentPage:number = 1;
  itemsPerPage:number = 20;
  dropdownSettings = {dynamicTitle: false, showCheckAll: false, showUncheckAll: false, enableSearch: true, displayProp: "label", idProp: "label", itemsShowLimit: 5};

  reportDateFilter:any = null;
  updateDateFilter:any = null;
  expiryDateFilter:any = null;

  dropdownStatusModel:any[] = [];
  dropdownStatusData:any[] = [];
  dropdownContextModel:any[] = [];
  dropdownContextData:any[] = [];
  dropdownScoreModel:any[] = [];
  dropdownScoreData:any[] = [];




  selectAll(){
    this.selected_tips = [];
    this.filteredTips.forEach(tip => {
    this.selected_tips.push(tip.id);
  });
  }
  deselectAll(){
    this.selected_tips=[]
  }
  // openGrantAccessModal() {
  //   this.utils.runUserOperation("get_users_names", {}, true).subscribe((response: any) => {
  //     const modalRef = this.modalService.open(GrantAccessComponent);
  //     modalRef.componentInstance.users_names = response.data;
  //     modalRef.componentInstance.confirmFun = (receiver_id: any) => {
  //       const args = {
  //         rtips: this.selected_tips,
  //         receiver: receiver_id
  //       };
  //       return this.utils.runRecipientOperation("grant", args, true);
  //     };
  //   });
    
  // }


  openGrantAccessModal(){
    alert('Alert from outside');

    this.utils.runUserOperation("get_users_names", {}, true).subscribe(
        {
          next: response => {
            const modalRef = this.modalService.open(GrantAccessComponent);
            modalRef.componentInstance.users_names = response;
            modalRef.componentInstance.confirmFun = (receiver_id: any) => {
              const args = {
                rtips: this.selected_tips,
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

  openRevokeAccessModal(){
    this.utils.runUserOperation("get_users_names", {}, true).subscribe((response: any) => {
      const modalRef = this.modalService.open(RevokeAccessComponent);
      modalRef.componentInstance.users_names = response.data;
      modalRef.componentInstance.confirmFun = (receiver_id: any) => {
        const args = {
          rtips: this.selected_tips,
          receiver: receiver_id
        };
        return this.utils.runRecipientOperation("revoke", args, true);
      };
    });
  }
  tipDeleteSelected(){
    const modalRef = this.modalService.open(DeleteConfirmationComponent);
    modalRef.componentInstance.selected_tips = this.selected_tips;
    modalRef.componentInstance.operation = "delete";
  }
  tipsExport(){
    for (let i = 0; i < this.selected_tips.length; i++) {
      (function(i) {
        // this.tokenResource.get().subscribe((token: any) => {
        //   window.open(`api/rtips/${this.selected_tips[i]}/export?token=${token.id}:${token.answer}`);
        // });
      })(i);
    }
  }
  reload(){
    location.reload()
  }


  ngOnInit(){
  }

  constructor(public httpService : HttpService, public rtips : RtipsResolver,public preference: PreferenceResolver,public modalService: NgbModal, public utils:UtilsService) {
  }
}
