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

@Injectable({
  providedIn: 'root'
})
export class TokenResource{

  private baseUrl = 'api/token/:id';

  constructor(private http: HttpClient) {}

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
}