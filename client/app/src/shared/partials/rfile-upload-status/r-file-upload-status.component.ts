import {Component, Input} from "@angular/core";
import {UtilsService} from "@app/shared/services/utils.service";
import {AppDataService} from "@app/app-data.service";
import {Transfer} from "@flowjs/ngx-flow";
import { NgIf, NgClass, NgStyle } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { TranslatorPipe } from "@app/shared/pipes/translate";
import { ByteFmtPipe } from "@app/shared/pipes/byte-fmt.pipe";

@Component({
    selector: "src-rfile-upload-status",
    templateUrl: "./r-file-upload-status.component.html",
    standalone: true,
    imports: [NgIf, NgClass, NgStyle, TranslateModule, TranslatorPipe, ByteFmtPipe]
})
export class RFileUploadStatusComponent {
  @Input() file: Transfer;
  @Input() formUploader: boolean;

  constructor(protected utilsService: UtilsService, protected appDataService: AppDataService) {
  }
}
