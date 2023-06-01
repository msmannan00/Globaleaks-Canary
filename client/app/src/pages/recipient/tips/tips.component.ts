import { Component } from '@angular/core';
import { NgbCalendar, NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppDataService } from 'app/src/app-data.service';
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
  selectedTips: any[] = [];
  //TO DO Filter
  filteredTips: any[] = this.rtips.dataModel.rtips;
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
  sortKey: string = 'creation_date';
  sortReverse: boolean = true;
  //NEED TO CONFIRM FOLLOWING
  index:number;
  reportDateModel:any;
	model: NgbDateStruct;
	date: { year: number; month: number };
  selectAll(){
    this.selectedTips = [];
    this.filteredTips.forEach(tip => {
    this.selectedTips.push(tip.id);
  });
  }
  deselectAll(){
    this.selectedTips=[]
  }

  openGrantAccessModal(){
    alert('Alert from outside');

    this.utils.runUserOperation("get_users_names", {}, true).subscribe(
        {
          next: response => {
            const modalRef = this.modalService.open(GrantAccessComponent);
            modalRef.componentInstance.users_names = response;
            modalRef.componentInstance.confirmFun = (receiver_id: any) => {
              const args = {
                rtips: this.selectedTips,
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
    this.utils.runUserOperation("get_users_names", {}, true).subscribe(
      {
        next: response => {
          const modalRef = this.modalService.open(RevokeAccessComponent);
          modalRef.componentInstance.users_names = response;
          modalRef.componentInstance.confirmFun = (receiver_id: any) => {
            const args = {
              rtips: this.selectedTips,
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
  tipDeleteSelected(){
    const modalRef = this.modalService.open(DeleteConfirmationComponent);
    modalRef.componentInstance.selectedTips = this.selectedTips;
    modalRef.componentInstance.operation = "delete";
  }
  tipsExport(){
    for (let i = 0; i < this.selectedTips.length; i++) {
      (function(i) {
        // this.tokenResource.get().subscribe((token: any) => {
        //   window.open(`api/rtips/${this.selectedTips[i]}/export?token=${token.id}:${token.answer}`);
        // });
      })(i);
    }
  }
  reload(){
    location.reload()
  }
  tipSwitch(id: number): void {
    this.index = this.selectedTips.indexOf(id);
    if (this.index > -1) {
      this.selectedTips.splice(this.index, 1);
    } else {
      this.selectedTips.push(id);
    }
  }
  isSelected(id: any): boolean {
    return this.selectedTips.indexOf(id) !== -1;
  }
  exportTip(id:number){}
  markReportStatus(date: string): boolean {
    const report_date = new Date(date);
    const current_date = new Date();
    return current_date > report_date;
  }
  
  ngOnInit(){
    console.log(this.rtips)
  }

// 


// 
  constructor(public httpService : HttpService, 
    public rtips : RtipsResolver,
    public preference: PreferenceResolver,
    public modalService: NgbModal, 
    public utils:UtilsService,
    public appDataService:AppDataService,
    ) {}
}
