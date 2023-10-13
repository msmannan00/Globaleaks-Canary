import {Component} from "@angular/core";
import {AppDataService} from "@app/app-data.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NodeResolver} from "@app/shared/resolvers/node.resolver";
import {DisclaimerComponent} from "@app/shared/modals/disclaimer/disclaimer.component";

@Component({
  selector: "src-homepage",
  templateUrl: "./homepage.component.html"
})
export class HomepageComponent {

  constructor(protected appDataService: AppDataService, private modalService: NgbModal, private nodeResolver: NodeResolver) {
  }

  openSubmission() {
    if (this.nodeResolver.dataModel.disclaimer_text) {
      return this.open_disclaimer_modal();
    }
    return this.appDataService.page = "submissionpage";
  }

  open_disclaimer_modal(): Promise<any> {
    const modalRef = this.modalService.open(DisclaimerComponent);
    modalRef.componentInstance.confirmFunction = () => {
      return this.appDataService.page = "submissionpage";
    };
    return modalRef.result;
  }
}
