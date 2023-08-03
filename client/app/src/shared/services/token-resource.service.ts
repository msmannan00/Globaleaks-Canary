import { Injectable } from '@angular/core';
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot, Router
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {HttpService} from "../services/http.service";
import { AuthenticationService } from 'app/src/services/authentication.service';
import { HttpClient } from '@angular/common/http';
// import { CryptoService } from 'app/src/crypto.service';
import sha256, {  } from "fast-sha256";
// import { UtilsService } from './utils.service';

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
    // super('api/token/:id', { id: '@id' });
  }

  getToken(id: any) {
    this.http.post<any>(this.baseUrl.replace(':id', id), {}).subscribe({
      next:(response:any)=>{},
      error:(error:any)=>{}
    });
  }

  private calculateProofOfWork(token: any): Promise<any> {
    // Implement the proof of work calculation here using glbcProofOfWork or any other method
    return new Promise((resolve, reject) => {
      // Perform proof of work calculation
      // Set token.answer = result
      resolve(token);
    });
  }

  // getWithProofOfWork(): Promise<any> {
  //   return this.$get().then((response: any) => {
  //     const token = response.resource;
  //     return this.cryptoService.proofOfWork(token.id).then((result) => {
  //       token.answer = result;
  //       return token;
  //     });
  //   });
  // }
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

    this.deferred = new Promise((resolve, reject) => {
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