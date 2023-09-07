import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppDataService } from 'app/src/app-data.service';
import { AuthenticationService } from 'app/src/services/authentication.service';
import { Constants } from 'app/src/shared/constants/constants';
import { DeleteConfirmationComponent } from 'app/src/shared/modals/delete-confirmation/delete-confirmation.component';
import { NodeResolver } from 'app/src/shared/resolvers/node.resolver';
import { PreferenceResolver } from 'app/src/shared/resolvers/preference.resolver';
import { TenantsResolver } from 'app/src/shared/resolvers/tenants.resolver';
import { UsersResolver } from 'app/src/shared/resolvers/users.resolver';
import { HttpService } from 'app/src/shared/services/http.service';
import { UtilsService } from 'app/src/shared/services/utils.service';

@Component({
  selector: 'src-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.css']
})
export class UserEditorComponent implements OnInit {
  @Input() user: any;
  @Input() index: any;
  @Input() editUser: NgForm;
  @Output() dataToParent = new EventEmitter<string>();
  editing = false;
  setPasswordArgs: any = {}
  changePasswordArgs: any = {}
  passwordStrengthScore: number = 0;
  nodeData: any = {}
  preferenceData: any = {}
  authenticationData: any = {}
  appServiceData: any = {}
  protected readonly Constants = Constants;

  constructor( public modalService: NgbModal,public appDataService: AppDataService, public preference: PreferenceResolver, public httpService: HttpService, public authenticationService: AuthenticationService, public node: NodeResolver, public users: UsersResolver, public tenants: TenantsResolver, public utilsService: UtilsService) {

  }
  ngOnInit(): void {
    if (this.node.dataModel) {
      this.nodeData = this.node.dataModel
    }
    if (this.preference.dataModel) {
      this.preferenceData = this.preference.dataModel
    }
    if (this.authenticationService) {
      this.authenticationData = this.authenticationService
    }
    if (this.appDataService) {
      this.appServiceData = this.appDataService
    }
    this.setPasswordArgs = {
      user_id: this.user.id,
      password: ""
    };
    this.changePasswordArgs = {
      password_change_needed: ""
    };
  }
  
  toggleEditing(){
    this.editing = !this.editing;
  }
  onPasswordStrengthChange(score: number) {
    this.passwordStrengthScore = score
  }
  disable2FA(user: any) {
    this.utilsService.runAdminOperation("disable_2fa", { "value": user.user.id }, true);
  }
  setPassword(setPasswordArgs: any) {
    this.utilsService.runAdminOperation("set_user_password", setPasswordArgs, true)
    // then(function() {
    //   // this.user.newpassword = false;
    //   // $scope.setPasswordArgs.password = "";
    // });
    this.user.newpassword = false;
    this.setPasswordArgs.password = "";
  }
  saveUser(userData: any) {
    var user = userData;
    if (user.pgp_key_remove) {
      user.pgp_key_public = "";
    }
    if (user.pgp_key_public !== "") {
      user.pgp_key_remove = false;
    }
    return this.utilsService.updateAdminUser(userData.id, userData).subscribe(res => {
      this.sendDataToParent()
      // this.utilsService.reloadCurrentRoute()
     })
  }
  sendDataToParent() {
    this.dataToParent.emit();
  }
  deleteUser(user: any) {
    this.openConfirmableModalDialog(user,"")
  }
  openConfirmableModalDialog(arg: any, scope: any): Promise<any> {
    scope = !scope ? this : scope;

    const modalRef = this.modalService.open(DeleteConfirmationComponent);
    modalRef.componentInstance.arg = arg;
    modalRef.componentInstance.scope = scope;
    modalRef.componentInstance.confirmFunction = () => {
        return  this.utilsService.deleteAdminUser(arg.id).subscribe(res=>{
          this.sendDataToParent()
          this.utilsService.reloadCurrentRoute();
        });
    };
    return modalRef.result;
  }
  resetUserPassword(user: any) {
    this.utilsService.runAdminOperation("send_password_reset_email", { "value": user.id }, true);
  }
  toggleUserEscrow(user: any) {
    this.user.escrow = !this.user.escrow;
    this.utilsService.runAdminOperation("toggle_user_escrow", { "value": user.id }, true);
  }
}
