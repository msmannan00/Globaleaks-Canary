import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {AppDataService} from "@app/app-data.service";
import {AuthenticationService} from "@app/services/authentication.service";
import {UtilsService} from "@app/shared/services/utils.service";
import {HttpService} from "@app/shared/services/http.service";
import {CryptoService} from "@app/crypto.service";

@Component({
  selector: "src-wbfiles",
  templateUrl: "./wb-files.component.html"
})
export class WbFilesComponent implements OnInit {
  @Input() wbFile: any;
  @Input() ctx: any;
  @Input() receivers_by_id: any;
  @Output() dataToParent = new EventEmitter<string>();
  
  constructor(private appDataService: AppDataService, private cryptoService: CryptoService, private httpService: HttpService, protected authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  deleteWBFile(wbFile: any) {
    if (this.authenticationService.session.role === "receiver") {
      this.httpService.deleteDBFile(wbFile.id).subscribe
      (
        {
          next: async _ => {
            this.dataToParent.emit(wbFile)
          }
        }
      );
    }
  }

  downloadWBFile(wbFile: any) {

    const param = JSON.stringify({});
    this.httpService.requestToken(param).subscribe
    (
      {
        next: async token => {
          const ans = await this.cryptoService.proofOfWork(token.id);
          if (this.authenticationService.session.role === "receiver") {
            window.open("api/recipient/rfiles/" + wbFile.id + "?token=" + token.id + ":" + ans);
          } else {
            window.open("api/whistleblower/wbtip/rfiles/" + wbFile.id + "?token=" + token.id + ":" + ans);
          }
          this.appDataService.updateShowLoadingPanel(false);
        }
      }
    );
  }
}
