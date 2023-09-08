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
// import {Constants} from "../../constants/constants";

@Component({
  selector: 'src-tab5',
  templateUrl: './tab5.component.html',
  styleUrls: ['./tab5.component.css']
})
export class Tab5Component {
  @Input() contentForm: NgForm;
  userData :any={}
  questionnaireData :any={}
  constructor(private modalService: NgbModal,public utilsService: UtilsService, public node: NodeResolver ,public preference:PreferenceResolver,public users:UsersResolver ,public questionnaires:QuestionnairesResolver) { 
    // console.log(this.node,"node");
    // console.log(this.utilsService,"utilsService");
    // console.log(this.preference,"preference");
    // console.log(this.users,"users");
  }
  protected readonly Constants = Constants;
  ngOnInit(): void {
    this.userData = this.users.dataModel
    this.userData = this.userData.filter((user: { escrow: boolean; }) => user.escrow === true);
    this.questionnaireData = this.questionnaires.dataModel

  }
  enableEncryption() {
    // Do not toggle till confirmation
    const node = this.node.dataModel;
    node.encryption = false;

    if (!node.encryption) {
      const modalRef = this.modalService.open(EnableEncryptionComponent, {
        // Configure your modal options here
      });

      // modalRef.result.then(
      //   () => {
      //     this.runAdminOperation("enable_encryption").then(
      //       () => {
      //         this.authenticationService.logout();
      //       },
      //       () => { }
      //     );
      //   },
      //   () => { }
      // );
    }
  }
  toggleEscrow() {
    this.node.dataModel.escrow = !this.node.dataModel.escrow;
    this.utilsService.runAdminOperation("toggle_escrow", {},true).then(
      () => {
        this.preference.dataModel.escrow = !this.preference.dataModel.escrow;
      },
      () => { }
    );
  }

  updateNode() {
    this.utilsService.update(this.node.dataModel).subscribe(res=>{
      this.utilsService.reloadCurrentRoute();
    })
  }

  resetSubmissions() {
    this.utilsService.deleteDialog()
  }
}
