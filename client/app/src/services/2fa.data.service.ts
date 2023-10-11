import { Injectable } from '@angular/core';

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
