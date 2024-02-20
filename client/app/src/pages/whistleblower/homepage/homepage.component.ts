import {Component, OnInit} from "@angular/core";
import {AppDataService} from "@app/app-data.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DisclaimerComponent} from "@app/shared/modals/disclaimer/disclaimer.component";
import {Observable} from "rxjs";
import {AppConfigService} from "@app/services/root/app-config.service";
import { SecurityAwarenessConfidentialityComponent } from "@app/shared/modals/security-awareness-confidentiality/security-awareness-confidentiality.component";

@Component({
  selector: "src-homepage",
  templateUrl: "./homepage.component.html"
})
export class HomepageComponent implements OnInit{

  constructor(protected appConfigService: AppConfigService, protected appDataService: AppDataService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.evaluateConfidentialityModalOpening();
  }

  openSubmission() {
    if (this.appDataService.public.node.disclaimer_text) {
      return this.openDisclaimerModal().subscribe();
    }
    this.appConfigService.setPage("submissionpage");
    return this.appDataService.page;
  }

  openDisclaimerModal(): Observable<string> {
    return new Observable((observer) => {
      const modalRef = this.modalService.open(DisclaimerComponent, {backdrop: 'static', keyboard: false});
      modalRef.componentInstance.confirmFunction = () => {
        observer.complete()
        this.appConfigService.setPage("submissionpage");
        return this.appDataService.page;
      };
    });
  }
  
  evaluateConfidentialityModalOpening(): void {
    if (!this.appDataService.connection.tor &&
        !this.appDataService.connection.https &&
        !this.appDataService.confidentialWarningOpened &&
        !['localhost', '127.0.0.1'].includes(location.host)) {
           this.appDataService.confidentialWarningOpened = true;
           this.openConfidentialityModal().subscribe();
    }
  }

  openConfidentialityModal(): Observable<string> {
    return new Observable((observer) => {
      const modalRef = this.modalService.open(SecurityAwarenessConfidentialityComponent, {backdrop: 'static', keyboard: false});
      modalRef.componentInstance.confirmFunction = () => {
        observer.complete()
        return;
      };
    });
  }
}
