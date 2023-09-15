import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpClient, HttpErrorResponse,
} from '@angular/common/http';
import {catchError, finalize, from, Observable, switchMap, throwError} from 'rxjs';
import {tokenResponse} from "../models/authentication/token-response";
import {CryptoService} from "../crypto.service";
import {AuthenticationService} from "./authentication.service";
import {AppDataService} from "../app-data.service";

const protectedUrls = [
  'api/wizard',
  'api/signup',
  'api/submission',
  'api/auth/receiptauth',
  'api/tokenauth',
  'api/auth/authentication',
  'api/reset/password',
];

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(public authenticationService: AuthenticationService, private httpClient: HttpClient, private cryptoService: CryptoService) {
  }
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (httpRequest.url.endsWith('/data/i18n/.json')) {
      return new Observable<HttpEvent<any>>();
    }

    let authHeader = this.authenticationService.getHeader();
    let authRequest = httpRequest
    for (let [key, value] of authHeader) {
      authRequest = httpRequest.clone({
        headers: authRequest.headers
          .set(key, value)
      });
    }
    if (protectedUrls.includes(httpRequest.url)) {
      return this.httpClient.post('api/auth/token', {}).pipe(switchMap((response) => {
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
}

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

  constructor(private authenticationService:AuthenticationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error['error_code'] === 10) {
            this.authenticationService.deleteSession()
            this.authenticationService.reset()
            this.authenticationService.routeLogin()
          }
          else if (error.error['error_code'] === 6 && this.authenticationService.isSessionActive()) {
            if (this.authenticationService.session.role !== "whistleblower") {
              location.pathname = this.authenticationService.session.homepage
            }
          }

          return throwError(() => error);
        })
      )
  }
}

@Injectable()
export class CompletedInterceptor implements HttpInterceptor {

  count=0
  constructor(private appDataService:AppDataService) {
  }
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
}
