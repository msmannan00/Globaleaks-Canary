import { Injectable } from '@angular/core';
import {HttpService} from "../shared/services/http.service";

@Injectable({
  providedIn: 'root'
})
export class TwofactorauthData {

  totp = {
    qrcode_string: "",
    secret: "",
    edit: false,
    token: ""
  };
}
