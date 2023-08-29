import {Component, Input} from '@angular/core';

@Component({
  selector: 'src-rfiles-upload-status',
  templateUrl: './rfiles-upload-status.component.html',
  styleUrls: ['./rfiles-upload-status.component.css']
})
export class RfilesUploadStatusComponent {
  @Input() uploading:any
  @Input() progress:any
  @Input() estimatedtime:any
  protected readonly isFinite = isFinite;
}
