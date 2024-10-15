import {Component, Input, OnInit} from "@angular/core";
import {UtilsService} from "@app/shared/services/utils.service";
import {AppDataService} from "@app/app-data.service";
import {AuthenticationService} from "@app/services/helper/authentication.service";
import {HttpService} from "@app/shared/services/http.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ReceiverTipService} from "@app/services/helper/receiver-tip.service";
import {WbFile} from "@app/models/app/shared-public-model";
import {PreferenceResolver} from "@app/shared/resolvers/preference.resolver";
import {MaskService} from "@app/shared/services/mask.service";
import {RedactionData} from "@app/models/component-model/redaction";
import { NgIf, NgFor, NgClass, DatePipe } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { TranslatorPipe } from "@app/shared/pipes/translate";
import { ByteFmtPipe } from "@app/shared/pipes/byte-fmt.pipe";
import { OrderByPipe } from "@app/shared/pipes/order-by.pipe";
@Component({
    selector: "src-tip-files-receiver",
    templateUrl: "./tip-files-receiver.component.html",
    standalone: true,
    imports: [NgIf, NgFor, NgClass, DatePipe, TranslateModule, TranslatorPipe, ByteFmtPipe, OrderByPipe]
})
export class TipFilesReceiverComponent implements OnInit {
  @Input() fileUploadUrl: string;
  @Input() redactMode: boolean;

  collapsed = false;

  constructor(protected maskService:MaskService,protected preferenceResolver:PreferenceResolver,protected modalService: NgbModal,protected httpService: HttpService, protected authenticationService: AuthenticationService, protected utilsService: UtilsService, protected tipService: ReceiverTipService, protected appDataService: AppDataService) {
  }

  ngOnInit(): void {
  }

  getSortedWBFiles(data: WbFile[]): WbFile[] {
    return data;
  }

  redactFileOperation(operation: string, content_type: string, file: any) {
    const redactionData:RedactionData= {
      reference_id: file.ifile_id,
      internaltip_id: this.tipService.tip.id,
      entry: "0",
      operation: operation,
      content_type: content_type,
      temporary_redaction: [],
      permanent_redaction: [],
    };

    if (operation === 'full-mask') {
      redactionData.temporary_redaction = [{ start: '-inf', end: 'inf' }];
    }

    const redaction = this.maskService.getRedaction(file.ifile_id, '0', this.tipService.tip);

    if (redaction) {
      redactionData.id = redaction.id;
      this.tipService.updateRedaction(redactionData);
    } else {
      this.tipService.newRedaction(redactionData);
    }
  }
}

