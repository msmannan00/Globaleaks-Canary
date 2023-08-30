import {Component, Input} from '@angular/core';
import {AppDataService} from "../../../../app-data.service";
import {DeleteConfirmationComponent} from "../../../../shared/modals/delete-confirmation/delete-confirmation.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {HttpService} from "../../../../shared/services/http.service";
import {UtilsService} from "../../../../shared/services/utils.service";
import {AppConfigService} from "../../../../services/app-config.service";

@Component({
  selector: 'src-siteslist',
  templateUrl: './siteslist.component.html'
})
export class SiteslistComponent {
  @Input() tenant:any;
  @Input() index:any;
  editing = false;

  constructor(public appConfigService:AppConfigService, public appDataService:AppDataService, public modalService: NgbModal, private httpService:HttpService, private utilsService:UtilsService) {
  }

  toggleActivation(event: Event): void {
    event.stopPropagation();
    this.tenant.active = !this.tenant.active;

    let url = "api/admin/tenants/"+this.tenant.id
    this.httpService.requestUpdateTenant(url, this.tenant).subscribe(res => {
      //this.appConfigService.reinit()
    });
  }

  isRemovableTenant(): boolean {
    return this.tenant.id !== 1;
  }

  configureTenant(event:any, tid:any){

  }

  saveTenant(){
    let url = "api/admin/tenants/"+this.tenant.id
    this.httpService.requestUpdateTenant(url, this.tenant).subscribe(res => {
    });
  }

  deleteTenant(event:any, tenant:any){
    event.stopPropagation();
    this.openConfirmableModalDialog(tenant, "")
  }

  openConfirmableModalDialog(arg: any, scope: any): Promise<any> {
    scope = !scope ? this : scope;
    const modalRef = this.modalService.open(DeleteConfirmationComponent);
    modalRef.componentInstance.arg = arg;
    modalRef.componentInstance.scope = scope;
    modalRef.componentInstance.confirmFunction = () => {

      let url = "api/admin/tenants/"+arg.id
      return this.httpService.requestDeleteTenant(url).subscribe(res => {
        this.appConfigService.reinit()
      });
    };
    return modalRef.result;
  }

  toggleEditing(event: Event): void {
    event.stopPropagation();
    this.editing = !this.editing;
  }
}
