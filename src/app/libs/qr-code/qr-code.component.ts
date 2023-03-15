import { Component } from '@angular/core';
import {UtilsService} from "../../utils.service";

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class QrCodeComponent {
  util_service: UtilsService;
  value = "random"
  constructor(private utils: UtilsService) {
    this.util_service = this.utils
    this.value = this.util_service.genRandomString(100)
  }
  onRefresh(){
    this.value = this.util_service.genRandomString(100)
  }
}
