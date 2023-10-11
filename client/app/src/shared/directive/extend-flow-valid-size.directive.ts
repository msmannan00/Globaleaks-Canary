import { Directive, ElementRef, Input } from '@angular/core';
// import { FlowFile } from 'flow.js'; // Replace 'flow.js' with the actual import for your Flow library

@Directive({
  selector: '[extendFlowValidSize]'
})
export class ExtendFlowValidSizeDirective {
  @Input() extendFlowValidSize: any;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const validSize = parseInt(this.extendFlowValidSize, 10);

    this.el.nativeElement.addEventListener('flow::fileAdded', (event: any) => {
    //   const flowFile: FlowFile = event['detail'][1];
      
    //   if (flowFile.size > validSize) {
    //     if (!this.el.nativeElement.file_error_msgs) {
    //       this.el.nativeElement.file_error_msgs = [];
    //     }
    //     const errMsg = this.translateInvalidSizeErr(flowFile.name, validSize);
    //     this.el.nativeElement.file_error_msgs.push(errMsg);
    //     event.preventDefault();
    //   }
    });
  }

  private translateInvalidSizeErr(fileName: string, validSize: number): string {
    // Implement your translation logic here
    return `File ${fileName} exceeds the allowed size of ${validSize} bytes.`;
  }
}
