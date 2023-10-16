import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from "@angular/core";
import {FlowDirective, Transfer} from "@flowjs/ngx-flow";
import {AuthenticationService} from "@app/services/authentication.service";
import {AppDataService} from "@app/app-data.service";
import {ControlContainer, NgForm} from "@angular/forms";

@Component({
  selector: "src-rfile-upload-button",
  templateUrl: "./r-file-upload-button.component.html",
  viewProviders: [{provide: ControlContainer, useExisting: NgForm}]
})
export class RFileUploadButtonComponent implements AfterViewInit, OnInit {

  @Input() fileUploadUrl: any;
  @Input() formUploader: boolean = true;
  @Input() uploads: any;
  @Input() field: any = undefined;
  @ViewChild("flowAdvanced", {static: true}) flowAdvanced: FlowDirective;
  @ViewChild("uploader") uploader: ElementRef;
  @Output() notifyFileUpload: EventEmitter<any> = new EventEmitter<any>();

  fileInput: any;
  showError: boolean;
  errorFile: Transfer;
  confirmButton = false;

  constructor(protected authenticationService: AuthenticationService, protected appDataService: AppDataService) {
  }

  ngOnInit(): void {
    this.fileInput = this.field ? this.field.id : "status_page";
  }

  ngAfterViewInit() {
    const self = this;
    this.flowAdvanced.transfers$.subscribe((event,) => {

      self.confirmButton = false;
      self.showError = false;

      if (!self.uploads) {
        self.uploads = {};
      }
      if (self.uploads && !self.uploads[self.fileInput]) {
        self.uploads[self.fileInput] = [];
      }
      event.transfers.forEach(function (file) {

        if (file.paused && self.errorFile) {
          self.errorFile.flowFile.cancel();
          return;
        }
        if (self.appDataService.public.node.maximum_filesize < (file.size / 1000000)) {
          self.showError = true;
          file.flowFile.pause();
          self.errorFile = file;
        } else if (!file.complete) {
          self.confirmButton = true;
        }
      });
      self.uploads[self.fileInput] = self.flowAdvanced;
      this.notifyFileUpload.emit(self.uploads);
    });
  }

  onConfirmClick() {
    if (!this.flowAdvanced.flowJs.isUploading()) {
      this.flowAdvanced.upload();
    }
  }
}
