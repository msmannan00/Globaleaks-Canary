import { Injectable } from '@angular/core';
import {
  Resolve,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {HttpService} from "../services/http.service";
import { AuthenticationService } from 'app/src/services/authentication.service';
import { notificationResolverModel } from 'app/src/models/resolvers/notificationResolverModel';
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class NotificationsResolver implements Resolve<boolean> {
  dataModel: notificationResolverModel = new notificationResolverModel();

  constructor(
    private httpService: HttpService,
    private authenticationService: AuthenticationService
  ) {}

  resolve(): Observable<boolean> {
    if (this.authenticationService.session.role === 'admin') {
      return this.httpService.requestNotificationsResource().pipe(
        map((response: notificationResolverModel) => {
          this.dataModel = response;
          return true;
        }),
        catchError(() => {
          return of(true);
        })
      );
    }
    return of(true);
  }
}
