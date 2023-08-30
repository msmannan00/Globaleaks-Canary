import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { NodeResolver } from '../../resolvers/node.resolver';
import { UtilsService } from '../../services/utils.service';
import { FlowDirective } from '@flowjs/ngx-flow';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'app/src/services/authentication.service';
import * as Flow from '@flowjs/flow.js';

@Component({
  selector: 'src-admin-file',
  templateUrl: './admin-file.component.html',
  styleUrls: ['./admin-file.component.css']
})
export class AdminFileComponent implements AfterViewInit, OnDestroy {
  @ViewChild('flow')
  flow: FlowDirective;
  @Input() adminFile: any;
  nodeData: any = []
  autoUploadSubscription: Subscription;
  flowConfig: any = {};
  @ViewChild('uploader') uploaderElementRef!: ElementRef<HTMLInputElement>;

  constructor(public node: NodeResolver, public utilsService: UtilsService, public authenticationService: AuthenticationService) {
  }
  ngOnInit() {
    this.nodeData = this.node.dataModel
  }
 
  ngAfterViewInit() {
    this.autoUploadSubscription = this.flow.events$.subscribe(event => {
      // to get rid of incorrect `event.type` type you need Typescript 2.8+
      if (event.type === 'filesSubmitted') {
        // this.flow.upload();
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
  reload() {
  }

  delete_file(url: string): void {
    this.utilsService.deleteFile(url).subscribe(
      () => {
        this.utilsService.reloadCurrentRoute();alert("xx17");
      },
      (error) => {
        console.error('Error deleting file:', error);
      }
    );
  }

  ngOnDestroy() {
    this.autoUploadSubscription.unsubscribe();
  }
 
}
