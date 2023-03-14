import { Component } from '@angular/core';
import {UtilsService} from "../../utils.service";
import sha256, { Hash, HMAC } from "fast-sha256";

@Component({
  selector: 'app-fastshah',
  templateUrl: './fastsha.component.html',
  styleUrls: ['./fastsha.component.css'],
  providers:  [ UtilsService ]
})

export class FastshaComponent {
  util_service: UtilsService;
  info = ""
  hash: any;
  constructor(private utils: UtilsService) {
    this.util_service = this.utils
  }
  onDigest(){
    let hash = sha256(this.util_service.str2Uint8Array(this.hash))
    this.info = this.util_service.buf2hex(hash)
  }

}
