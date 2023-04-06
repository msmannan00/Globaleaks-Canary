import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpClient, HttpErrorResponse,
} from '@angular/common/http';
import {catchError, from, Observable, switchMap, throwError} from 'rxjs';
import {tokenResponse} from "../models/authentication/token-response";
import {CryptoService} from "../crypto.service";
import {AuthenticationService} from "./authentication.service";

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

    if (httpRequest.url.toString()=="api/authentication" || httpRequest.url.toString()=="api/reset/password") {
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

  constructor(public authenticationService: AuthenticationService, private httpClient: HttpClient, private cryptoService: CryptoService) {
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
