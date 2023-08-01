import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {UtilsService} from "../../services/utils.service";

@Component({
  selector: 'src-file-view',
  templateUrl: './file-view.component.html',
  styleUrls: ['./file-view.component.css']
})
export class FileViewComponent implements OnInit {
  @Input() args: any;
  iframeUrl: SafeResourceUrl;
  @ViewChild('viewer') viewerFrame: ElementRef;
  constructor(private sanitizer: DomSanitizer, private renderer: Renderer2, private elementRef: ElementRef, private utilsService:UtilsService, private modalService: NgbModal) {
   
  }
  viewFile() {
    this.utilsService.view("api/rfile/" + this.args.file.id, this.args.file.type, (blob: Blob) => {
      this.args.loaded = true;
      window.addEventListener("message", () => {
        const data = {
          tag: this.getFileTag(this.args.file.type),
          blob: blob
        };
        const iframeElement = this.viewerFrame.nativeElement;
        iframeElement.contentWindow.postMessage(data, "*");

      }, { once: true });
    });
  }
  getFileTag(type:string) {
    if (type === "application/pdf") {
      return "pdf";
    } else if (type.indexOf("audio/") === 0) {
      return "audio";
    } else if (type.indexOf("image/") === 0) {
      return "image";
    } else if (type === "text/csv" || type === "text/plain") {
      return "txt";
    } else if (type.indexOf("video/") === 0) {
      return "video";
    } else {
      return "none";
    }
  };

  openBlobImageInNewTab(blob: Blob) {
    const url = URL.createObjectURL(blob);
    const newTab = window.open();
    if (newTab) {
      newTab.document.write(`<html><body><img src="${url}" /></body></html>`);
    } else {
      alert("Pop-up blocker prevented opening the image in a new tab.");
    }
  }

  ngOnInit() {
    this.iframeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('viewer/index.html');
    this.args.iframeHeight = window.innerHeight * 0.75;
    // this.args.tags = this.getFileTag(this.args.file.type);
    this.viewFile();
    
    // this.utilsService.view("api/rfile/" + this.args.file.id, this.args.file.type, (blob: Blob) => {
    //   this.args.loaded = true;
    //   window.addEventListener("message", function() {
    //     // console.log(self.args.tag,"self.args.tag");
        
    //     let data = {
    //       tag: this.args.tag,
    //       blob: blob
    //     };

    //     const iframeElement = self.elementRef.nativeElement.querySelector("#viewer");
    //     iframeElement.contentWindow.postMessage(data, "*");

    //   }, {once: true});
    // });
  }

  cancel() {
    this.modalService.dismissAll();
  }
}
