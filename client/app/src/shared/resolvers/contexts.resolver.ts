import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { HttpService } from "../services/http.service";
import { AuthenticationService } from 'app/src/services/authentication.service';
import { contextResolverModel } from 'app/src/models/resolvers/contextResolverModel';

@Injectable({
  providedIn: 'root'
})
export class ContextsResolver implements Resolve<boolean> {
  dataModel: contextResolverModel = new contextResolverModel();

  constructor(
    private httpService: HttpService,
    private authenticationService: AuthenticationService
  ) {}

  resolve(): Observable<boolean> {
    if (this.authenticationService.session.role === 'admin') {
      return this.httpService.requestContextsResource().pipe(
        switchMap((response: contextResolverModel) => {
          this.dataModel = response;
          return of(true);
        }),
        catchError(() => {
          return of(true);
        })
      );
    }

    return of(true);
  }
}
