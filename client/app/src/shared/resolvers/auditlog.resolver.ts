import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {nodeResolverModel} from "../../models/resolvers/nodeResolverModel";
import {HttpService} from "../services/http.service";
import {AuthenticationService} from "../../services/authentication.service";
import {auditlogResolverModel} from "../../models/resolvers/auditlogResolverModel";

@Injectable({
  providedIn: 'root'
})
export class AuditlogResolver implements Resolve<boolean> {
  dataModel:auditlogResolverModel = new auditlogResolverModel()

  resolve(route: ActivatedRouteSnapshot, c: RouterStateSnapshot): Observable<boolean> {
    if(this.authenticationService.session.role ==='admin'){
      let requestObservable = this.httpService.requestAdminAuditLogResource({"update": {method: "PUT"}})
      requestObservable.subscribe(
          {
            next: (response:auditlogResolverModel) => {
              this.dataModel = response
            },
            error: (error: any) => {
            }
          }
      );
    }
    return of(true);
  }

  constructor(public httpService: HttpService, private router: Router, public authenticationService:AuthenticationService) {
  }
}
