import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NodeResolver } from '../../resolvers/node.resolver';

@Component({
  selector: 'src-disclaimer',
  templateUrl: './disclaimer.component.html',
})
export class DisclaimerComponent implements OnInit {
  confirmFunction: () => void;
  nodeData: any = []
  constructor(private activeModal: NgbActiveModal, private modalService: NgbModal,public node: NodeResolver,) {
  }
 
  ngOnInit(): void {
     if (this.node.dataModel) {
       this.nodeData = this.node.dataModel
     }
   }

  confirm() {
    this.confirmFunction()
    return this.activeModal.close();
  }

  cancel() {
    this.modalService.dismissAll();
  }
}
