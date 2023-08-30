import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as Flow from '@flowjs/flow.js';
import { FlowEvent, FlowFile } from '@flowjs/flow.js';
import { FlowDirective } from '@flowjs/ngx-flow';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from 'app/src/services/authentication.service';
import { NodeResolver } from 'app/src/shared/resolvers/node.resolver';
import { UtilsService } from 'app/src/shared/services/utils.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'src-tab2',
  templateUrl: './tab2.component.html',
  styleUrls: ['./tab2.component.css']
})
export class Tab2Component implements OnInit {
  @Input() contentForm: NgForm;
  @ViewChild('flowAdvanced', { static: true }) flowAdvanced: FlowDirective;
  @ViewChild('uploader') uploader: ElementRef;

  admin_files: any[] = [{
    "title": "Favicon",
    "varname": "favicon",
    "filename": "custom_favicon.ico",
    "size": "131072"
  },
  {
    "title": "CSS",
    "varname": "css",
    "filename": "custom_stylesheet.css",
    "size": "1048576"
  }];

  files: FlowFile[] = [];
  flow: FlowDirective;
  flowConfig: any = {};
  autoUploadSubscription: Subscription;

  constructor(private httpClient: HttpClient, public utilsService: UtilsService, public node: NodeResolver, config: NgbTooltipConfig, public authenticationService: AuthenticationService) { }


  // onFileSelected(files: FileList | null) {
  //   if (files && files.length > 0) {
  //     const file = files[0]; // Assuming you only handle a single file at a time

  //     const flowJsInstance = this.flow.flowJs;
  //     flowJsInstance.addFile(file);
  //     flowJsInstance.upload();
  //   }
  // }




  ngOnInit(): void {
    this.updateFiles();
  }
  onFileSelected(files: FileList | null) {
    if (files && files.length > 0) {
      const file = files[0]; // Assuming you only handle a single file at a time

      const flowJsInstance = new Flow({ target: 'api/admin/files/custom', speedSmoothingFactor: 0.01, singleFile: true, allowDuplicateUploads: false, testChunks: false, permanentErrors: [500, 501], headers: { 'X-Session': this.authenticationService.session.id } });
      flowJsInstance.addFile(file);
      flowJsInstance.upload();
      alert("abc6")
      this.utilsService.reloadCurrentRoute();alert("xx5");

    }
  }
  // ngAfterViewInit() {
  //   this.autoUploadSubscription = this.flowAdvanced.events$.subscribe(event => {
  //     if (event.type === 'filesSubmitted') {
  //       // this.flow.upload();
  //     }
  //   });
  // }

  // ngOnDestroy() {
  //   this.autoUploadSubscription.unsubscribe();
  // }
  reload(): void {
    // Implement reload logic if needed
  }

  delete_file(url: string): void {
    this.utilsService.deleteFile(url).subscribe(
      () => {
        this.updateFiles();
        alert("abc5")
        this.utilsService.reloadCurrentRoute();alert("xx6");
      },
      (error) => {
        console.error('Error deleting file:', error);
      }
    );
  }
  updateFiles(): void {
    this.utilsService.getFiles().subscribe(
      (updatedFiles) => {
        this.files = updatedFiles;
      },
      (error) => {
        console.error('Error fetching files:', error);
      }
    );
  }
  uploadSuccess($event: FlowEvent): void {
    // Implement upload success logic
    this.reload();
  }
}
