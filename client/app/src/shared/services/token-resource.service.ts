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
import { CryptoService } from 'app/src/crypto.service';
@Injectable({
  providedIn: 'root'
})
export class TokenResource{

  private baseUrl = 'api/token/:id';

  constructor(private http: HttpClient,private cryptoService:CryptoService) {
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
        console.log(response,"response");
        
        const token = response;
        return this.cryptoService.proofOfWork(token.id)
          .then((result: any) => {
            console.log(result,"result");
            
            token.answer = result;
            return token;
          });
      });
  }
}