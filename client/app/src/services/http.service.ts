import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  getResource(url:string, params?:[], actions?:string){
    return this.httpClient.get<any>(url);
  }

  getPublicResource(): Observable<any>{
    return this.getResource("/api/public");
  }

  constructor(private httpClient: HttpClient) {
  }
}
