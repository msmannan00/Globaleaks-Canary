import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {UtilsService} from "../../services/utils.service";
import {PreferenceResolver} from "../../resolvers/preference.resolver";
import {Constants} from "../../constants/constants";

@Component({
  selector: 'src-request-support',
  templateUrl: './request-support.component.html'
})
export class RequestSupportComponent implements OnInit {
  protected readonly Constants = Constants;
  sent = false
  arg = {
    mail_address: "",
    text: ""
  };

  constructor(public activeModal: NgbActiveModal, public utilsService: UtilsService, public preferenceResolver: PreferenceResolver) {
  }

  ngOnInit(): void {
    this.arg.mail_address = this.preferenceResolver.dataModel.mail_address
  }

}
