import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { FlowDirective, Transfer } from '@flowjs/ngx-flow';
import { Subscription } from 'rxjs';
import {  } from '@flowjs/ngx-flow';
import { AuthenticationService } from 'app/src/services/authentication.service';

// import { FlowService } from '@flowjs/ngx-flow';
@Component({
  selector: 'src-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements AfterViewInit, OnDestroy{
  @ViewChild('flowAdvanced')
  flow: FlowDirective;
  @ViewChild('uploader') uploaderElementRef!: ElementRef<HTMLInputElement>;

  @Input() imageUploadModel: any;
  @Input() imageUploadModelAttr: string;
  @Input() imageUploadId: string;
  imageUploadObj: any = {
      files: [],
  };
  autoUploadSubscription: Subscription;

  constructor(private http: HttpClient,public authenticationService:AuthenticationService) {}
  ngOnInit() {}
  ngAfterViewInit() {
    this.autoUploadSubscription = this.flow.events$.subscribe(event => {
      if (event.type === 'filesSubmitted') {
        this.imageUploadModel[this.imageUploadModelAttr] = true;
      }
    });
  }
  onFileSelected(files: FileList | null) {
    if (files && files.length > 0) {
      const file = files[0]; // Assuming you only handle a single file at a time
      const flowJsInstance = this.flow.flowJs;
      flowJsInstance.addFile(file);
      flowJsInstance.upload();
    }
  }
  triggerFileInputClick() {
    this.uploaderElementRef.nativeElement.click();
  }
  ngOnDestroy() {
    this.autoUploadSubscription.unsubscribe();
  }

  deletePicture() {
    this.http
      .delete("api/admin/files/" + this.imageUploadId)
      .subscribe(() => {
        if (this.imageUploadModel) {
          this.imageUploadModel[this.imageUploadModelAttr] = "";
        }
        this.imageUploadObj.files = [];
      });
  }
}
