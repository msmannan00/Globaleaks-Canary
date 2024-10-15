import {Component, Input} from "@angular/core";
import {UtilsService} from "@app/shared/services/utils.service";
import {WbtipService} from "@app/services/helper/wbtip.service";
import {HttpService} from "@app/shared/services/http.service";
import {AppDataService} from "@app/app-data.service";
import {CryptoService} from "@app/shared/services/crypto.service";
import {AuthenticationService} from "@app/services/helper/authentication.service";
import {WbFile} from "@app/models/app/shared-public-model";
import { NgIf, NgFor, DatePipe } from "@angular/common";
import { RFileUploadButtonComponent } from "../rfile-upload-button/r-file-upload-button.component";
import { TranslateModule } from "@ngx-translate/core";
import { TranslatorPipe } from "@app/shared/pipes/translate";
import { ByteFmtPipe } from "@app/shared/pipes/byte-fmt.pipe";
import { OrderByPipe } from "@app/shared/pipes/order-by.pipe";


@Component({
    selector: "src-tip-files-whistleblower",
    templateUrl: "./tip-files-whistleblower.component.html",
    standalone: true,
    imports: [NgIf, NgFor, RFileUploadButtonComponent, DatePipe, TranslateModule, TranslatorPipe, ByteFmtPipe, OrderByPipe]
})
export class TipFilesWhistleblowerComponent {
  @Input() fileUploadUrl: string;
  collapsed = false;

  constructor(private appDataService: AppDataService, private cryptoService: CryptoService, private httpService: HttpService, protected authenticationService: AuthenticationService, protected utilsService: UtilsService, protected wbTipService: WbtipService) {
  }

  downloadWBFile(wbFile: WbFile) {

    const param = JSON.stringify({});
    this.httpService.requestToken(param).subscribe
    (
      {
        next: async token => {
          this.cryptoService.proofOfWork(token.id).subscribe(
              (ans) => {
                window.open("api/whistleblower/wbtip/wbfiles/" + wbFile.id + "?token=" + token.id + ":" + ans);
                this.appDataService.updateShowLoadingPanel(false);
              }
          );
        }
      }
    );
  }

  getSortedWBFiles(data: WbFile[]): WbFile[] {
    return data;
  }

  public toggleColLapse() {
    this.collapsed = !this.collapsed;
  }
}
