import {Component, Input, ViewChild, ElementRef} from '@angular/core';
import { UtilsService } from "../../services/utils.service";
import { AppDataService } from "../../../app-data.service";
import {AuthenticationService} from "../../../services/authentication.service";
import {AppConfigService} from "../../../services/app-config.service";
import * as Flow from "@flowjs/flow.js";

@Component({
  selector: 'src-tip-upload-wbfile',
  templateUrl: './tip-upload-wbfile.component.html'
})
export class TipUploadWbfileComponent{
  @ViewChild('uploader') uploaderElementRef!: ElementRef<HTMLInputElement>;
  @Input() tip: any = {};
  @Input() key: any;

  collapsed = false;
  file_upload_description: string="";
  fileinput: any = "fileinput";

  constructor(public appConfigService:AppConfigService, public authenticationService:AuthenticationService, public utilsService: UtilsService, public appDataService: AppDataService) {

  }

  public toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

  onFileSelected(files: FileList | null) {
    if (files && files.length > 0) {
      const file = files[0];

      const flowJsInstance = new Flow({target: 'api/recipient/rtips/' + this.tip.id + '/rfiles', speedSmoothingFactor:0.01, singleFile:true, query: { description: this.file_upload_description,visibility : this.key,fileSizeLimit: this.appDataService.public.node.maximum_filesize*1024*1024 }, allowDuplicateUploads:false, testChunks:false, permanentErrors : [ 500, 501 ], headers : {'X-Session':this.authenticationService.session.id}});
      flowJsInstance.on('fileSuccess', (file, message) => {
        this.appConfigService.reinit(false)
        this.utilsService.reloadCurrentRoute()
      });

      const fileNameParts = file.name.split('.');
      const fileExtension = fileNameParts.pop();
      const fileNameWithoutExtension = fileNameParts.join('.');
      const timestamp = new Date().getTime();
      const fileNameWithTimestamp = `${fileNameWithoutExtension}_${timestamp}.${fileExtension}`;
      const modifiedFile = new File([file], fileNameWithTimestamp, { type: file.type });

      flowJsInstance.addFile(modifiedFile);
      flowJsInstance.upload();
    }
  }

  protected readonly console = console;
  protected readonly alert = alert;
}
