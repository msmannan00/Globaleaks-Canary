import {Component, Input, OnInit} from '@angular/core';
import {UtilsService} from "../../../../shared/services/utils.service";
import {HttpClient} from "@angular/common/http";
import {DeleteConfirmationComponent} from "../../../../shared/modals/delete-confirmation/delete-confirmation.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AppConfigService} from "../../../../services/app-config.service";
import {HttpService} from "../../../../shared/services/http.service";

@Component({
  selector: 'src-substatuses',
  templateUrl: './substatuses.component.html'
})
export class SubstatusesComponent implements OnInit{
  @Input() submissions_status:any
  substatus_editing: boolean[] = [];
  new_substatus:any
  showAddSubstatus: boolean = false;
  toggleAddSubstatus(): void {
    this.showAddSubstatus = !this.showAddSubstatus;
  }

  constructor(private httpService:HttpService, private appConfigService:AppConfigService,public modalService: NgbModal, public utilsService:UtilsService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.substatus_editing = new Array(this.submissions_status.length).fill(false);
  }

  addSubmissionSubStatus(): void {
    let order = this.utilsService.newItemOrder(this.submissions_status.substatuses, "order")
    const new_submissions_substatuses = {
      label: this.new_substatus,
      order: order
    };

    this.http.post<any>(
        `/api/admin/statuses/${this.submissions_status.id}/substatuses`,
        new_submissions_substatuses
    ).subscribe(
        result => {
          this.submissions_status.substatuses.push(result);
          this.new_substatus=''
        }
    );
  }

  swapSs($event: any, index: number, n: number): void {
    $event.stopPropagation();

    const target = index + n;

    if (target < 0 || target >= this.submissions_status.substatuses.length) {
      return;
    }

    const temp = this.submissions_status.substatuses[index];
    this.submissions_status.substatuses[index] = this.submissions_status.substatuses[target];
    this.submissions_status.substatuses[target] = temp;

    const ids = this.submissions_status.substatuses.map((c: any) => c.id);

    this.http.put<any>(
        `/api/admin/statuses/${this.submissions_status.id}/substatuses`,
        {
          operation: 'order_elements',
          args: { ids: ids }
        }
    ).subscribe();
  }

  save_submissions_substatuses(substatus:any):void{
    // let url = "http://127.0.0.1:8082/api/admin/statuses/" + this.submissions_status.id + "/substatuses/" + substatus.id
    let url = "/api/admin/statuses/" + this.submissions_status.id + "/substatuses/" + substatus.id
    this.httpService.requestUpdateStatus(url, substatus).subscribe(res => {
      this.appConfigService.reinit()
    });
  }

  deleteSubSubmissionStatus(substatus:any):void{
    this.openConfirmableModalDialog(substatus, "")
  }

  openConfirmableModalDialog(arg: any, scope: any): Promise<any> {
    scope = !scope ? this : scope;
    const modalRef = this.modalService.open(DeleteConfirmationComponent);
    modalRef.componentInstance.arg = arg;
    modalRef.componentInstance.scope = scope;
    modalRef.componentInstance.confirmFunction = () => {

      let url = "/api/admin/statuses/" + this.submissions_status.id + "/substatuses/"+arg.id
      return this.utilsService.deleteSubStatus(url).subscribe(res => {
        this.appConfigService.reinit()
      });
    };
    return modalRef.result;
  }

  moveSsUp(e: any, idx: number): void {
    this.swapSs(e, idx, -1);
  }

  moveSsDown(e: any, idx: number): void {
    this.swapSs(e, idx, 1);
  }

  toggleSubstatusEditing(index:number): void {
    this.substatus_editing[index] = !this.substatus_editing[index];
  }

  protected readonly JSON = JSON;
}
