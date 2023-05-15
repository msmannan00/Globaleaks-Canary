import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpClient, HttpErrorResponse, HttpResponse,
} from '@angular/common/http';
import {catchError, finalize, from, map, Observable, switchMap, throwError} from 'rxjs';
import {tokenResponse} from "../models/authentication/token-response";
import {CryptoService} from "../crypto.service";
import {AuthenticationService} from "./authentication.service";
import {AppDataService} from "../app-data.service";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authHeader = this.authenticationService.getHeader();
    let authRequest = httpRequest
    for (let [key, value] of authHeader) {
      authRequest = httpRequest.clone({
        headers: authRequest.headers
          .set(key, value)
      });
    }
    if (httpRequest.url.toString()=="api/signup" || httpRequest.url.toString()=="api/submission" ||  httpRequest.url.toString()=="api/receiptauth" || httpRequest.url.toString()=="api/tokenauth" || httpRequest.url.toString()=="api/authentication" || httpRequest.url.toString()=="api/reset/password") {

      return this.httpClient.post('api/token', {user: 123}).pipe(switchMap((response) => {
        let token = Object.assign(new tokenResponse(), response)
        return from(this.cryptoService.proofOfWork(token.id))
          .pipe(
            switchMap(ans => {
              const clone = httpRequest.clone({
                headers: httpRequest.headers
                  .set('x-token', token.id + ":" + ans)
              });
              return next.handle(clone);
            })
          );
      }));
    } else {
      return next.handle(authRequest);
    }
  }

  constructor(private appDataService:AppDataService, public authenticationService: AuthenticationService, private httpClient: HttpClient, private cryptoService: CryptoService) {
  }
}

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      )
  }

  constructor() {
  }

}

@Injectable()
export class CompletedInterceptor implements HttpInterceptor {

  count=0
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.count === 0) {
      this.appDataService.showLoadingPanel = true
    }
    this.count++;
    return next.handle(req).pipe(
    finalize(() => {
      this.count--;
      if (this.count === 0) {
        this.appDataService.showLoadingPanel = false
      }
    }));
  }

  constructor(private appDataService:AppDataService) {
  }

}
