import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Constants } from 'app/src/shared/constants/constants';
import { EnableEncryptionComponent } from 'app/src/shared/modals/enable-encryption/enable-encryption.component';
import { NodeResolver } from 'app/src/shared/resolvers/node.resolver';
import { PreferenceResolver } from 'app/src/shared/resolvers/preference.resolver';
import { QuestionnairesResolver } from 'app/src/shared/resolvers/questionnaires.resolver';
import { UsersResolver } from 'app/src/shared/resolvers/users.resolver';
import { WbtipResolver } from 'app/src/shared/resolvers/wbtip.resolver';
import { UtilsService } from 'app/src/shared/services/utils.service';
import { AppConfigService } from "../../../../services/app-config.service";
import { AuthenticationService } from 'app/src/services/authentication.service';
// import {Constants} from "../../constants/constants";

@Component({
  selector: 'src-tab5',
  templateUrl: './tab5.component.html',
  styleUrls: ['./tab5.component.css']
})
export class Tab5Component {
  @Input() contentForm: NgForm;
  userData: any = {}
  questionnaireData: any = {}
  constructor(public authenticationService: AuthenticationService, private modalService: NgbModal, private appConfigService: AppConfigService, public utilsService: UtilsService, public node: NodeResolver, public preference: PreferenceResolver, public users: UsersResolver, public questionnaires: QuestionnairesResolver) {

  }
  protected readonly Constants = Constants;
  ngOnInit(): void {
    this.userData = this.users.dataModel
    this.userData = this.userData.filter((user: { escrow: boolean; }) => user.escrow === true);
    this.questionnaireData = this.questionnaires.dataModel

  }
  enableEncryption() {
    const node = this.node.dataModel;
    node.encryption = false;

    if (!node.encryption) {
      const modalRef = this.modalService.open(EnableEncryptionComponent, {});
      modalRef.result.then(
        () => {
          this.utilsService.runAdminOperation("enable_encryption", {}, false).subscribe(
            () => {
              this.authenticationService.logout();
            },
            () => { }
          );
        },
        () => { }
      );
    }
  }
  toggleEscrow() {
    this.node.dataModel.escrow = !this.node.dataModel.escrow;
    this.utilsService.runAdminOperation("toggle_escrow", {}, true).subscribe(
      () => {
        this.preference.dataModel.escrow = !this.preference.dataModel.escrow;
      },
      () => { }
    );
  }

  updateNode() {
    this.utilsService.update(this.node.dataModel).subscribe(res => {
      this.appConfigService.reinit()
      this.utilsService.reloadCurrentRoute();
    })
  }

  resetSubmissions() {
    this.utilsService.deleteDialog()
  }
}
