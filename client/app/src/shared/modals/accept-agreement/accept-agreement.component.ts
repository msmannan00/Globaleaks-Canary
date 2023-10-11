import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NodeResolver } from '../../resolvers/node.resolver';
import { PreferenceResolver } from '../../resolvers/preference.resolver';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'src-accept-agreement',
  templateUrl: './accept-agreement.component.html',
})
export class AcceptAgreementComponent implements OnInit{
  confirmFunction: () => void;
  nodeData: any = []
  preferenceData: any = []
  accept:boolean =false
  constructor(private activeModal: NgbActiveModal,private http: HttpClient, public modalService: NgbModal, public preference: PreferenceResolver, public utilsService: UtilsService, public node: NodeResolver) { }
  ngOnInit(): void {
    if (this.node.dataModel) {
      this.nodeData = this.node.dataModel
    }
    if (this.preference.dataModel) {
      this.preferenceData = this.preference.dataModel
    }
  }
  
 confirm() {
    this.confirmFunction()
    return this.activeModal.close();
  }
}
