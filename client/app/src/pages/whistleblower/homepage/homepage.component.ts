import { Component } from '@angular/core';
import { AppDataService } from "../../../app-data.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NodeResolver } from 'app/src/shared/resolvers/node.resolver';
import { PreferenceResolver } from 'app/src/shared/resolvers/preference.resolver';
import { UtilsService } from 'app/src/shared/services/utils.service';
import { DisclaimerComponent } from 'app/src/shared/modals/disclaimer/disclaimer.component';

@Component({
  selector: 'src-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  constructor(public appDataService: AppDataService, public modalService: NgbModal, public preference: PreferenceResolver, public utilsService: UtilsService, public node: NodeResolver,) {
  }

  openSubmission() {
    if (this.node.dataModel.disclaimer_text) {
      return this.open_disclaimer_modal();
    }
    return this.appDataService.page = "submissionpage"
  }
  open_disclaimer_modal(): Promise<any> {
    const modalRef = this.modalService.open(DisclaimerComponent);
    modalRef.componentInstance.confirmFunction = () => {
      return this.appDataService.page = "submissionpage"
    };
    return modalRef.result;
  }
}
