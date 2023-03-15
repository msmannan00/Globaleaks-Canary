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

  genRandomString(length:number) {
    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    let charLength = chars.length;
    let result = '';
    for ( let i = 0; i < length; i++ ) {
      result += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
  }
}
