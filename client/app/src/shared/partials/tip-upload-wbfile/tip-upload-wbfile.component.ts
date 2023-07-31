import {Component, Input, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { UtilsService } from "../../services/utils.service";
import { FlowFile } from "@flowjs/flow.js";
import { AppDataService } from "../../../app-data.service";
import {AuthenticationService} from "../../../services/authentication.service";
import {FlowDirective} from "@flowjs/ngx-flow";

@Component({
  selector: 'src-tip-upload-wbfile',
  templateUrl: './tip-upload-wbfile.component.html',
  styleUrls: ['./tip-upload-wbfile.component.css']
})
export class TipUploadWbfileComponent implements AfterViewInit{
  collapsed = false;
  @Input() tip: any = {};
  file_upload_description: string="";
  fileinput: any = "saddsasasd";

  @ViewChild('uploader') uploaderElementRef!: ElementRef<HTMLInputElement>;
  @ViewChild('flowAdvanced') flowAdvanced: FlowDirective;

  flowConfig: any = {}; // Add this declaration for flowConfig

  constructor(public authenticationService:AuthenticationService, public utilsService: UtilsService, public appDataService: AppDataService) {
  }

  public toggleCollapse() {
    this.collapsed = !this.collapsed;
  }

  onFileSelected(files: FileList | null) {
    if (files && files.length > 0) {
      const file = files[0]; // Assuming you only handle a single file at a time

      const flowJsInstance = this.flowAdvanced.flowJs;
      flowJsInstance.addFile(file);
      flowJsInstance.upload();
    }
  }

  ngAfterViewInit() {
    this.flowAdvanced.events$.subscribe((event: any) => {
      if (event.type === 'fileSuccess') {
        // File uploaded successfully, reload the page
        this.utilsService.reloadCurrentRoute()
      }
    });
  }

  protected readonly alert = alert;
  protected readonly JSON = JSON;
}
