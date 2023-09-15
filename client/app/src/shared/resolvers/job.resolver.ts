import { Injectable } from '@angular/core';
import {
  Resolve,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpService } from '../services/http.service';
import { AuthenticationService } from '../../services/authentication.service';
import { jobResolverModel } from '../../models/resolvers/jobResolverModel';

@Injectable({
  providedIn: 'root'
})
export class JobResolver implements Resolve<boolean> {
  dataModel: jobResolverModel = new jobResolverModel();

  constructor(
    private httpService: HttpService,
    private authenticationService: AuthenticationService
  ) {}

  resolve(): Observable<boolean> {
    if (this.authenticationService.session.role === 'admin') {
      this.httpService.requestJobResource().pipe(
        map((response: jobResolverModel) => {
          this.dataModel = response;
          return true;
        })
      );
      return of(true);
    }
    return of(true);
  }
}
