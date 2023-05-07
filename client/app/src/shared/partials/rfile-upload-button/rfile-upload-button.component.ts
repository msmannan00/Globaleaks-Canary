import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FlowDirective, Transfer} from "@flowjs/ngx-flow";
import {Subscription} from "rxjs";
import {AuthenticationService} from "../../../services/authentication.service";
import {AppDataService} from "../../../app-data.service";
import {forEach} from "lodash";
import {FlowFile} from "@flowjs/flow.js";
import {ControlContainer, NgForm} from "@angular/forms";

@Component({
  selector: 'src-rfile-upload-button',
  templateUrl: './rfile-upload-button.component.html',
  styleUrls: ['./rfile-upload-button.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class RfileUploadButtonComponent implements AfterViewInit, OnDestroy, OnInit{

  @Input() fileupload_url:any;
  @Input() formuploader:boolean = true;
  @Input() uploads:any
  @Input() field:any = undefined
  @ViewChild('flowAdvanced', { static: true }) flowAdvanced: FlowDirective;
  @ViewChild('uploader') uploader: ElementRef;

  fileinput:any
  showerror:boolean
  errorFile:Transfer
  confirmButton = false
  _fakemodel: any = {};
  currentSessionSize = 0

  ngOnInit(): void {
    this.fileinput = this.field ? this.field.id : 'status_page'
  }

  trackTransfer(transfer: Transfer):any {
    return transfer.id;
  }

  ngAfterViewInit() {
    const self = this;
    this.flowAdvanced.transfers$.subscribe((event,) => {

      self.confirmButton = false;
      self.showerror = false
      if(self.uploads[self.fileinput]){
        self.uploads[self.fileinput] = {}
      }
      event.transfers.forEach(function(file){
        self.uploads[self.fileinput] = file

        if(file.paused && self.errorFile){
          self.errorFile.flowFile.cancel()
          return
        }
        if(self.appDataService.public.node.maximum_filesize < (file.size/1000000)){
          self.showerror = true
          file.flowFile.pause()
          self.errorFile = file
        }else if(!file.complete){
          self.confirmButton = true
        }
      });
      // if(this.uploads && this.uploads[this.fileinput]){
        // this.submission.uploads[this.fileinput] = this.uploads[this.fileinput]
      // }
    });
  }

  deleteFile(){
    alert(JSON.stringify(this.errorFile))
  }

  ngOnDestroy(): void {
    this._fakemodel = null
  }

  constructor(public authenticationService:AuthenticationService, public appDataService:AppDataService) {
  }

  protected readonly Float32Array = Float32Array;
  protected readonly undefined = undefined;
}
