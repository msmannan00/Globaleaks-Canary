import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FlowDirective, Transfer} from "@flowjs/ngx-flow";
import {Subscription} from "rxjs";
import {AuthenticationService} from "../../../services/authentication.service";
import {AppDataService} from "../../../app-data.service";
import {forEach} from "lodash";
import {FlowFile} from "@flowjs/flow.js";

@Component({
  selector: 'src-rfile-upload-button',
  templateUrl: './rfile-upload-button.component.html',
  styleUrls: ['./rfile-upload-button.component.css']
})
export class RfileUploadButtonComponent implements AfterViewInit, OnDestroy, OnInit{

  @Input() fileupload_url:any;
  @ViewChild('flowAdvanced', { static: true }) flowAdvanced: FlowDirective;

  field:any = undefined
  fileinput:any
  showerror:boolean
  errorFile:Transfer
  uploads:any={}
  confirmButton = false
  _fakemodel: any = {};
  currentSessionSize = 0

  autoUploadSubscription: Subscription;

  ngOnInit(): void {
    this.fileinput = this.field ? this.field.id : 'status_page'
    this.uploads[this.fileinput] = {}
  }

  trackTransfer(transfer: Transfer):any {
    return transfer.id;
  }

  ngAfterViewInit() {
    const self = this;
    this.flowAdvanced.transfers$.subscribe((event,) => {
      self.confirmButton = false;
      self.showerror = false
      event.transfers.forEach(function(file){
        if(file.paused && self.errorFile){
          self.errorFile.flowFile.cancel()
          return
        }
        if(self.appDataService.public.node.maximum_filesize < (file.size/1000000)){
          self.showerror = true
          file.flowFile.pause()
          self.errorFile = file
        }else {
          self.confirmButton = true
        }
      });
    });
  }
  ngOnDestroy(): void {
    this._fakemodel = null
  }

  constructor(public authenticationService:AuthenticationService, public appDataService:AppDataService) {
  }

  protected readonly Float32Array = Float32Array;
  protected readonly undefined = undefined;
}
