import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { FlowDirective, Transfer } from '@flowjs/ngx-flow';
import { Subscription } from 'rxjs';
// import { FlowService } from '@flowjs/ngx-flow';
@Component({
  selector: 'src-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements AfterViewInit, OnDestroy{
  @ViewChild('flowAdvanced')
  flow: FlowDirective;
   formData = new FormData();

  @Input() imageUploadModel: any;
  @Input() imageUploadModelAttr: string;
  @Input() imageUploadId: string;
  imageUploadObj: any = {
      files: [],
  };
  constructor(private http: HttpClient) {

  }
  ngOnInit() {
    // console.log(this.imageUploadModel,"imageUploadModel");
    // console.log(this.imageUploadModelAttr,"imageUploadModelAttr");
    // console.log(this.imageUploadId,"imageUploadId");

  }


  autoUploadSubscription: Subscription;


  ngAfterViewInit() {
    this.autoUploadSubscription = this.flow.events$.subscribe(event => {
      console.log(event, "event");

      // to get rid of incorrect `event.type` type you need Typescript 2.8+
      if (event.type === 'filesSubmitted') {
        if (this.flow?.flowJs?.files?.length > 0) {
          console.log(this.flow.flowJs,"this.flow.flowJs");
          
      // const file = this.flow.flowJs.files[0].file;
      const file = this.flow.flowJs.files[0].file;
      const formData = new FormData();
      formData.append('file', file);

      this.http.post('api/admin/files/' + this.imageUploadId, formData,).subscribe(
        (response) => {
          console.log('Upload successful', response);
        },
        (error) => {
          console.error('Upload error', error);
        }
      );
    }
        // this.flow.upload();
        this.imageUploadModel[this.imageUploadModelAttr] = true;

      }
    });
  }

  ngOnDestroy() {
    this.autoUploadSubscription.unsubscribe();
  }

  onFilesSubmitted() {
    // this.flowService.upload();
  }
  onFlowComplete() {
    this.imageUploadModel[this.imageUploadModelAttr] = true;
  }
  uploadFile(flowBasic: any) {
    console.log(flowBasic, "flowbasic");

    if (flowBasic?.flowJs?.files?.length > 0) {
      const file = flowBasic.flowJs.files[0].file;
      const formData = new FormData();
      formData.append('file', file);

      // const queryParams = new HttpParams().set('param1', 'value1').set('param2', 'value2');

      // Replace 'api/admin/files/upload' with your actual API endpoint for file upload
      this.http.post('api/admin/files/' + this.imageUploadId, formData,).subscribe(
        (response) => {
          // Handle successful upload response
          console.log('Upload successful', response);
        },
        (error) => {
          // Handle error
          console.error('Upload error', error);
        }
      );
    }
  }






  deletePicture() {
    this.http
      .delete("api/admin/files/" + this.imageUploadId)
      .subscribe(() => {
        if (this.imageUploadModel) {
          this.imageUploadModel[this.imageUploadModelAttr] = "";
        }
        this.imageUploadObj.flow.files = [];
      });
  }
}
