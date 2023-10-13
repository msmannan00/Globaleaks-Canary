import {Component, Input, ViewChild, ElementRef} from "@angular/core";
import {UtilsService} from "../../services/utils.service";
import {AppDataService} from "@app/app-data.service";
import {AuthenticationService} from "@app/services/authentication.service";
import {AppConfigService} from "@app/services/app-config.service";
import * as Flow from "@flowjs/flow.js";

@Component({
  selector: "src-tip-upload-wbfile",
  templateUrl: "./tip-upload-wb-file.component.html"
})
export class TipUploadWbFileComponent {
  @ViewChild("uploader") uploaderElementRef!: ElementRef<HTMLInputElement>;
  @Input() tip: any = {};
  @Input() key: any;

  collapsed = false;
  file_upload_description: string = "";
  fileInput: any = "fileinput";

  constructor(private appConfigService: AppConfigService, private authenticationService: AuthenticationService, protected utilsService: UtilsService, private appDataService: AppDataService) {

  }

  onFileSelected(files: FileList | null) {
    if (files && files.length > 0) {
      const file = files[0];

      const flowJsInstance = new Flow({
        target: "api/recipient/rtips/" + this.tip.id + "/rfiles",
        speedSmoothingFactor: 0.01,
        singleFile: true,
        query: {
          description: this.file_upload_description,
          visibility: this.key,
          fileSizeLimit: this.appDataService.public.node.maximum_filesize * 1024 * 1024
        },
        allowDuplicateUploads: false,
        testChunks: false,
        permanentErrors: [500, 501],
        headers: {"X-Session": this.authenticationService.session.id}
      });
      flowJsInstance.on("fileSuccess", (_) => {
        this.appConfigService.reinit(false);
        this.utilsService.reloadCurrentRoute();
      });

      const fileNameParts = file.name.split(".");
      const fileExtension = fileNameParts.pop();
      const fileNameWithoutExtension = fileNameParts.join(".");
      const timestamp = new Date().getTime();
      const fileNameWithTimestamp = `${fileNameWithoutExtension}_${timestamp}.${fileExtension}`;
      const modifiedFile = new File([file], fileNameWithTimestamp, {type: file.type});

      flowJsInstance.addFile(modifiedFile);
      flowJsInstance.upload();
    }
  }

  protected readonly console = console;
  protected readonly alert = alert;
}
