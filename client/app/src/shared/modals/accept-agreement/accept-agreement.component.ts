import {Component, OnInit} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {PreferenceResolver} from "@app/shared/resolvers/preference.resolver";
import {AppDataService} from "@app/app-data.service";
import {preferenceResolverModel} from "@app/models/resolvers/preference-resolver-model";
import { NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { TranslatorPipe } from "@app/shared/pipes/translate";

@Component({
    selector: "src-accept-agreement",
    templateUrl: "./accept-agreement.component.html",
    standalone: true,
    imports: [
        NgIf,
        FormsModule,
        TranslateModule,
        TranslatorPipe,
    ],
})
export class AcceptAgreementComponent implements OnInit {
  confirmFunction: () => void;
  preferenceData: preferenceResolverModel;
  accept: boolean = false;

  constructor(private activeModal: NgbActiveModal, private preference: PreferenceResolver, public appDataService: AppDataService) {
  }

  ngOnInit(): void {
    if (this.preference.dataModel) {
      this.preferenceData = this.preference.dataModel;
    }
  }

  confirm() {
    this.confirmFunction();
    return this.activeModal.close();
  }
}
