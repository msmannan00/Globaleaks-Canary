import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Transfer} from "@flowjs/ngx-flow";
import {Subscription} from "rxjs";
import {AuthenticationService} from "../../../services/authentication.service";
import {AppDataService} from "../../../app-data.service";

@Component({
  selector: 'src-rfile-upload-button',
  templateUrl: './rfile-upload-button.component.html',
  styleUrls: ['./rfile-upload-button.component.css']
})
export class RfileUploadButtonComponent implements AfterViewInit, OnDestroy, OnInit{

  @Input() fileupload_url:any;

  field:any = undefined
  fileinput:any
  showerror:boolean
  errorTransfer:Transfer
  uploads:any={}
  confirmButton = false
  _fakemodel: any = {};

  autoUploadSubscription: Subscription;

  ngOnInit(): void {
    this.fileinput = this.field ? this.field.id : 'status_page'
    this.uploads[this.fileinput] = {}
  }

  trackTransfer(transfer: Transfer):any {
    return transfer.id;
  }

  ngAfterViewInit() {
  }
  ngOnDestroy(): void {
    this._fakemodel = null
  }

  confirmButtonStatus(status:boolean){
    this.confirmButton = status
  }
  onError(transfer:Transfer){
    if(this.errorTransfer){
      this.errorTransfer.flowFile.cancel()
    }
    this.errorTransfer = transfer
  }
  onErrorStatus(status:boolean){
    this.showerror = status
  }

  constructor(public authenticationService:AuthenticationService, public apasdpDataService:AppDataService) {
  }

  protected readonly Float32Array = Float32Array;
}
