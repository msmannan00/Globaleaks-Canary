import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  str2Uint8Array(str:string){
    let result = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) {
      result[i] = str.charCodeAt(i);
    }
    return result;
  }

  openSupportModal() {
    // return this.openConfirmableModalDialog("views/modals/request_support.html", {});
  }

}
