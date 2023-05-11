import {Component, EventEmitter, Input, Output} from '@angular/core';
import {WbtipService} from "../../../services/wbtip.service";
import {UtilsService} from "../../services/utils.service";
import {orderBy} from "lodash";
import {FieldUtilitiesService} from "../../services/field-utilities.service";

@Component({
  selector: 'src-whistleblower-identity',
  templateUrl: './whistleblower-identity.component.html',
  styleUrls: ['./whistleblower-identity.component.css']
})
export class WhistleblowerIdentityComponent {
  collapsed = false;
  protected readonly JSON = JSON;
  @Input() field:any
  @Input() step:any
  @Input() answers:any
  identity_provided:boolean = false
  @Output() provideIdentityInformation = new EventEmitter<{ param1: any, param2: any }>();
  @Output() onFormUpdate = new EventEmitter<void>();
  @Output() notifyFileUpload: EventEmitter<any> = new EventEmitter<any>();

  public toggleColapse(){
    this.collapsed = !this.collapsed
  }

  constructor(public wbtipService:WbtipService, public utilsService:UtilsService, public fieldUtilitiesService:FieldUtilitiesService) {
    this.collapsed = this.wbtipService.tip.data.whistleblower_identity_provided
  }

  onFormChange() {
    this.onFormUpdate.emit()
  }

  stateChanged(status:boolean){
    this.identity_provided = status
  }
}
