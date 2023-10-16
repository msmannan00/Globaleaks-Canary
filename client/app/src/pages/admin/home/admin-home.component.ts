import {HttpClient} from "@angular/common/http";
import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AcceptAgreementComponent} from "@app/shared/modals/accept-agreement/accept-agreement.component";
import {NodeResolver} from "@app/shared/resolvers/node.resolver";
import {PreferenceResolver} from "@app/shared/resolvers/preference.resolver";

@Component({
  selector: "src-home",
  templateUrl: "./admin-home.component.html"
})
export class adminHomeComponent implements OnInit {
  active: any = 0;
  nodeData: any = [];
  preferenceData: any = [];

  constructor(private http: HttpClient, private modalService: NgbModal, private preference: PreferenceResolver, protected nodeResolver: NodeResolver, private router: Router) {
  }

  ngOnInit(): void {
    if (this.nodeResolver.dataModel) {
      this.nodeData = this.nodeResolver.dataModel;
    }
    if (this.preference.dataModel) {
      this.preferenceData = this.preference.dataModel;
    }
    if (this.nodeData.user_privacy_policy_text && this.preferenceData.accepted_privacy_policy === "1970-01-01T00:00:00Z") {
      this.acceptPrivacyPolicyDialog();
    }
  }

  acceptPrivacyPolicyDialog(): Promise<any> {
    const modalRef = this.modalService.open(AcceptAgreementComponent);
    modalRef.componentInstance.confirmFunction = () => {

      return this.http.put("api/user/operations", {
        operation: "accepted_privacy_policy",
        args: {}
      }).subscribe(() => {
        this.preferenceData.accepted_privacy_policy = "";
      });
    };

    return modalRef.result;

  }

  isActive(route: string): boolean {
    return this.router.isActive(route, false);
  }
}