import {Component} from "@angular/core";
import {AppDataService} from "@app/app-data.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DisclaimerComponent} from "@app/shared/modals/disclaimer/disclaimer.component";
import {Observable} from "rxjs";

@Component({
  selector: "src-homepage",
  templateUrl: "./homepage.component.html"
})
export class HomepageComponent {
  constructor(protected appDataService: AppDataService, private modalService: NgbModal) {
  }
 
  openSubmission() {
    if (this.appDataService.public.node.disclaimer_text) {
      return this.openDisclaimerModal().subscribe();
    }
      return this.appDataService.page = "submissionpage";
  }

  openDisclaimerModal(): Observable<string> {
    return new Observable((observer) => {
      let modalRef = this.modalService.open(DisclaimerComponent, {});
      modalRef.componentInstance.confirmFunction = () => {
        observer.complete()
        return this.appDataService.page = "submissionpage";
      };
    });
  }
}
