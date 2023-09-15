import { Injectable } from '@angular/core';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpService } from '../services/http.service';
import { AuthenticationService } from '../../services/authentication.service';
import { auditlogResolverModel } from '../../models/resolvers/auditlogResolverModel';

@Injectable({
  providedIn: 'root'
})
export class AuditlogResolver implements Resolve<boolean> {
  dataModel:auditlogResolverModel = new auditlogResolverModel()
  constructor(
    private httpService: HttpService,
    private authenticationService: AuthenticationService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    if (this.authenticationService.session.role === 'admin') {
      this.httpService.requestAdminAuditLogResource().pipe(
        switchMap((response: auditlogResolverModel) => {
          this.handleResponse(response);
          return of(true);
        })
      );
      return of(true);
    }
    return of(true);
  }

  private handleResponse(response: auditlogResolverModel): void {
    this.dataModel = response;
  }
}
