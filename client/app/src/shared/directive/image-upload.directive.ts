import { ComponentFactoryResolver, Directive, Input, ViewContainerRef } from '@angular/core';
import { ImageUploadComponent } from '../partials/image-upload/image-upload.component';

@Directive({
  selector: '[appImageUpload]',
})
export class ImageUploadDirective {
  @Input() imageUploadModel: any;
  @Input() imageUploadModelAttr: string;
  @Input() imageUploadId: string;
  @Input() imageSrcUrl: string;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    // Create the component factory
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ImageUploadComponent);

    // Create the component instance
    const componentRef = this.viewContainerRef.createComponent(componentFactory);

    // You can interact with the component instance if needed
    const dynamicComponentInstance = componentRef.instance;

    // Optionally, you can set input properties or subscribe to component events
    dynamicComponentInstance.imageUploadModel = this.imageUploadModel;
    dynamicComponentInstance.imageUploadModelAttr = this.imageUploadModelAttr;
    dynamicComponentInstance.imageUploadId = this.imageUploadId;
    // dynamicComponentInstance.someEvent.subscribe(event => { /* handle event */ });
    console.log(this.imageUploadModel,"imageUploadModel");
    console.log(this.imageUploadModelAttr,"imageUploadModelAttr");
    console.log(this.imageUploadId,"imageUploadId");
  }
}
