import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmationComponent} from "app/src/shared/modals/confirmation/confirmation.component";
import {NetworkResolver} from "app/src/shared/resolvers/network.resolver";
import {NodeResolver} from "app/src/shared/resolvers/node.resolver";
import {HttpService} from "app/src/shared/services/http.service";

@Component({
  selector: "src-https-status",
  templateUrl: "./https-status.component.html"
})
export class HttpsStatusComponent implements OnInit {
  @Output() dataToParent = new EventEmitter<string>();
  @Input() tlsConfig: any;
  nodeData: any;

  constructor(protected networkResolver: NetworkResolver, private nodeResolver: NodeResolver, private httpService: HttpService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.nodeData = this.nodeResolver.dataModel;
  }

  toggleCfg() {
    if (this.tlsConfig.enabled) {
      this.httpService.disableTLSConfig().subscribe(() => {
        this.dataToParent.emit();
      });
    } else {
      this.httpService.enableTLSConfig().subscribe(() => {
        window.location.href = "https://" + this.nodeData.hostname;
      });
    }
  }

  resetCfg() {
    const modalRef = this.modalService.open(ConfirmationComponent);
    modalRef.componentInstance.arg = null;
    modalRef.componentInstance.confirmFunction = (_: any) => {
      return this.httpService.requestDeleteTlsConfigResource().subscribe(() => {
        this.dataToParent.emit();
      });
    };
    return modalRef.result;
  }
}