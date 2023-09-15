import { Injectable } from '@angular/core';
import {
  Resolve,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {HttpService} from "../services/http.service";
import { AuthenticationService } from 'app/src/services/authentication.service';
import { redirectResolverModel } from 'app/src/models/resolvers/redirectResolverModel';
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RedirectsResolver implements Resolve<boolean> {
  dataModel: redirectResolverModel = new redirectResolverModel();

  constructor(
    private httpService: HttpService,
    private authenticationService: AuthenticationService
  ) {}

  resolve(): Observable<boolean> {
    if (this.authenticationService.session.role === 'admin') {
      this.httpService.requestRedirectsResource().pipe(
        map((response: redirectResolverModel) => {
          this.dataModel = response;
          return true;
        })
      );
      return of(true);
    }
    return of(true);
  }
}
