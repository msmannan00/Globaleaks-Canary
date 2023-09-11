import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import sha256, {  } from "fast-sha256";

@Injectable({
  providedIn: 'root'
})
export class TokenResource{

  private baseUrl = 'api/token/:id';
  deferred:Promise<any>
  data:any
  counter:number = 0
  resolver:any

  constructor(private http: HttpClient) {
  }

  getToken(id: any) {
    this.http.post<any>(this.baseUrl.replace(':id', id), {}).subscribe();
  }

  getWithProofOfWork(): Promise<any> {
    return this.http.post('api/token', {}).toPromise()
      .then((response: any) => {
        const token = response;
        return this.proofOfWork(token.id)
          .then((result: any) => {
            token.answer = result;
            return token;
          });
      });
  }
 

  getWebCrypto() {
    if (typeof window === "undefined" || !window.isSecureContext) {
      return;
    }
    return window.crypto.subtle;
  };

  calculateHash(hash:any, resolve:any) {
    hash = new Uint8Array(hash);
    if (hash[31] === 0) {
      resolve(this.counter)
    } else {
      this.counter+=1
      this.work(resolve);
    }
  };

  work(resolve:any){
    let webCrypto = this.getWebCrypto();
    let toHash = this.str2Uint8Array(this.data+this.counter);
    let digestPremise;

    if (webCrypto) {
      digestPremise = webCrypto.digest({name: "SHA-256"}, toHash);
    } else {
      digestPremise = new Promise((resolve, reject) => {
        if(sha256(toHash)) {
          resolve('ok');
        } else {
          reject('error');
        }
      })
    }

    if (typeof digestPremise.then !== "undefined") {
      digestPremise.then(res => {
        this.calculateHash(res, resolve)
      });
    } else {
      digestPremise.then(res => {
        return res
      });
    }

    return digestPremise;
  }
  proofOfWork(data: any): Promise<any> {

    this.deferred = new Promise((resolve) => {
      this.data = data
      this.counter = 0
      this.work(resolve)
    });

    return this.deferred;
  }
  str2Uint8Array(str:string){
    let result = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) {
      result[i] = str.charCodeAt(i);
    }
    return result;
  }
}