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

  buf2hex(buffer:ArrayBuffer) { // buffer is an ArrayBuffer
    return [...new Uint8Array(buffer)]
      .map(x => x.toString(16).padStart(2, '0'))
      .join('');
  }


}
