import {Component, Input, OnInit} from "@angular/core";
import {UtilsService} from "../../services/utils.service";
import {AppDataService} from "app/src/app-data.service";
import {AuthenticationService} from "@app/services/authentication.service";
import {HttpService} from "../../services/http.service";
import {CryptoService} from "@app/crypto.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FileViewComponent} from "../../modals/file-view/file-view.component";
import {RecieverTipService} from "app/src/services/recievertip.service";

@Component({
  selector: "src-tip-files-receiver",
  templateUrl: "./tip-files-receiver.component.html"
})
export class TipFilesReceiverComponent implements OnInit {
  @Input() fileUploadUrl: any;
  supportedViewTypes = ["application/pdf", "audio/mpeg", "image/gif", "image/jpeg", "image/png", "text/csv", "text/plain", "video/mp4"];
  collapsed = false;

  constructor(public modalService: NgbModal, private cryptoService: CryptoService, public httpService: HttpService, public authenticationService: AuthenticationService, public utilsService: UtilsService, public tipService: RecieverTipService, public appDataService: AppDataService) {
  }

  ngOnInit(): void {
  }

  public viewRFile(file: any) {
    const modalRef = this.modalService.open(FileViewComponent);
    modalRef.componentInstance.args = {
      file: file,
      loaded: false,
      iframeHeight: window.innerHeight * 0.75
    };
  }

  public downloadRFile(file: any) {
    const param = JSON.stringify({});
    this.httpService.requestToken(param).subscribe
    (
      {
        next: async token => {
          const ans = await this.cryptoService.proofOfWork(token.id);
          window.open("/api/recipient/wbfiles/" + file.id + "?token=" + token.id + ":" + ans);
        }
      }
    );
  }
}