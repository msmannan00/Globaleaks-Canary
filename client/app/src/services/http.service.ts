import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import { Observable } from 'rxjs';
import {password_recovery_response_model} from "../dataModels/authentication/password_recovery_response_model";


@Injectable({
  providedIn: 'root'
})
export class HttpService{

  getPublicResource(): Observable<any>{
    return this.httpClient.get<any>("/api/public");
  }
  requestGeneralLogin(param: string): Observable<any>{
    const headers = { 'content-type': 'application/json'}
    return this.httpClient.post("api/authentication", param,{'headers':headers })
  }

  requestChangePassword(param: string): Observable<any>{
    const headers = { 'content-type': 'application/json'}
    return this.httpClient.put<password_recovery_response_model>("api/reset/password", param,{'headers':headers })
  }

  requestResetLogin(param: string): Observable<any>{
    const headers = { 'content-type': 'application/json'}
    return this.httpClient.post("api/reset/password", param,{'headers':headers })
  }

  constructor(private httpClient: HttpClient) {
  }
}
