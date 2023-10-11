import {Component, Input} from '@angular/core';
import {AppDataService} from "../../../../app-data.service";
import {HttpService} from "../../../../shared/services/http.service";
import {DeleteConfirmationComponent} from "../../../../shared/modals/delete-confirmation/delete-confirmation.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UtilsService} from "../../../../shared/services/utils.service";
import {AppConfigService} from "../../../../services/app-config.service";

@Component({
  selector: 'src-substatusmanager',
  templateUrl: './substatusmanager.component.html'
})
export class SubstatusmanagerComponent {
  editing = false;
  @Input() submissions_status:any
  @Input() index:number
  @Input() first:boolean
  @Input() last:boolean


  constructor(public appConfigService:AppConfigService, public appDataServices:AppDataService, public httpService:HttpService, public modalService: NgbModal, private utilsService:UtilsService) {

  }

  isSystemDefined(state: any): boolean {
    return ["new", "opened", "closed"].indexOf(state.id) !== -1;
  }

  toggleEditing(submissions_status:any): void {
    if (this.isEditable(submissions_status)) {
      this.editing = !this.editing;
    }
  }

  isEditable(submissions_status:any): boolean {
    return ["new", "opened"].indexOf(submissions_status.id) === -1;
  }

  moveUp(e: any, idx: number): void {
    this.swap(e, idx, -1);
  }

  moveDown(e: any, idx: number): void {
    this.swap(e, idx, 1);
  }

  ss_idx(ss_id: any): number | undefined {
    for (let i = 0; i < this.appDataServices.submission_statuses.length; i++) {
      const status = this.appDataServices.submission_statuses[i];
      if (status.id === ss_id) {
        return i;
      }
    }
    return undefined;
  }

  swap($event: any, index: number, n: number): void {
    $event.stopPropagation();

    var target = index + n;

    if (target < 0 || target >= this.appDataServices.submission_statuses.length) {
      return;
    }

    var orig_index = this.ss_idx(this.appDataServices.submission_statuses[index].id);
    var orig_target = this.ss_idx(this.appDataServices.submission_statuses[target].id);

    if(orig_index != undefined && orig_target != undefined){
      var moving_status = this.appDataServices.submission_statuses[orig_index];
      this.appDataServices.submission_statuses[orig_index] = this.appDataServices.submission_statuses[orig_target];
      this.appDataServices.submission_statuses[orig_target] = moving_status;

      const reordered_ids = {
        ids: this.appDataServices.submission_statuses
            .map((c: any) => c.id)
            .filter((c: number | string) => c)
      };
      let data = {
        "operation": "order_elements",
        "args": reordered_ids,
      }
      this.httpService.runOperation("/api/admin/statuses", "order_elements",  data, false)
    }
  }

  deleteSubmissionStatus(submissions_status: any): void {
    this.openConfirmableModalDialog(submissions_status, "")
  }

  save_submissions_status(submissions_status:any):void{
    // let url = "http://127.0.0.1:8082/api/admin/statuses/" + submissions_status.id
    let url = "/api/admin/statuses/" + submissions_status.id
    this.httpService.requestUpdateStatus(url, submissions_status).subscribe(res => {
      this.appConfigService.reinit()
    });
  }

  openConfirmableModalDialog(arg: any, scope: any): Promise<any> {
    scope = !scope ? this : scope;
    const modalRef = this.modalService.open(DeleteConfirmationComponent);
    modalRef.componentInstance.arg = arg;
    modalRef.componentInstance.scope = scope;
    modalRef.componentInstance.confirmFunction = () => {
      let url = "/api/admin/statuses/" + arg.id
      return this.utilsService.deleteStatus(url).subscribe(res => {
        this.appConfigService.reinit()
      });
    };
    return modalRef.result;
  }

  saveSubmissionsStatus(submissions_status: any): void {
    this.openConfirmableModalDialog(submissions_status, "saveSubmissionsStatus")
      .then(result => {
        if (result) {
        }
    });
  }
}
