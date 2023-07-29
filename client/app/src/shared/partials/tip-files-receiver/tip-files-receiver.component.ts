import {Component, Input, OnInit} from '@angular/core';
import {UtilsService} from "../../services/utils.service";
import { RecieverTipService } from 'app/src/services/recievertip.service';
import { AppDataService } from 'app/src/app-data.service';
import {AuthenticationService} from "../../../services/authentication.service";
import {HttpService} from "../../services/http.service";
import {CryptoService} from "../../../crypto.service";
import {TipOperationPostponeComponent} from "../../modals/tip-operation-postpone/tip-operation-postpone.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FileViewComponent} from "../../modals/file-view/file-view.component";

@Component({
  selector: 'src-tip-files-receiver',
  templateUrl: './tip-files-receiver.component.html',
  styleUrls: ['./tip-files-receiver.component.css']
})
export class TipFilesReceiverComponent implements OnInit{
  @Input() fileupload_url:any
  supportedViewTypes = ["application/pdf", "audio/mpeg", "image/gif", "image/jpeg", "image/png", "text/csv", "text/plain", "video/mp4"];

  collapsed = false
  public toggleColapse(){
    this.collapsed = !this.collapsed
  }
  constructor(public modalService: NgbModal, private cryptoService: CryptoService, public httpService: HttpService, public authenticationService:AuthenticationService, public utilsService:UtilsService,public tipService:RecieverTipService, public appDataService: AppDataService ) {
  }

  ngOnInit(): void {
  }

  public viewRFile(file:any){
    const modalRef = this.modalService.open(FileViewComponent);
    modalRef.componentInstance.args = {
      file: file,
      loaded: false,
      iframeHeight:  window.innerHeight * 0.75
    };
  }

  public downloadRFile(file:any){
    const param=JSON.stringify({});
    this.httpService.requestToken(param).subscribe
    (
        {
          next: async token => {
            const ans = await this.cryptoService.proofOfWork(token.id);
            window.open("api/rfile/" + file.id + "?token=" + token.id + ":" + ans);
          },
          error: (error: any) => {
            alert(JSON.stringify(error))
          }
        }
    );
  }
}