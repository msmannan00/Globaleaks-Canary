import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpClient, HttpErrorResponse,
} from '@angular/common/http';
import {catchError, from, Observable, switchMap, throwError} from 'rxjs';
import {tokenResponse} from "../models/token-response";
import {CryptoService} from "../crypto.service";
import {AppConfigService} from "../app-config.service";
import {errorCodes} from "../models/error-code";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (httpRequest.url.toString()=="api/authentication") {
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
      return next.handle(httpRequest);
    }
  }

  constructor(private httpClient: HttpClient, private cryptoService: CryptoService, public appConfigService: AppConfigService) {
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

  constructor(public appConfigService: AppConfigService) {
  }

}
