import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {auditlogResolverModel} from "../../models/resolvers/auditlogResolverModel";
import {HttpService} from "../services/http.service";
import {AuthenticationService} from "../../services/authentication.service";
import {jobResolverModel} from "../../models/resolvers/jobResolverModel";

@Injectable({
  providedIn: 'root'
})
export class JobResolver implements Resolve<boolean> {
  dataModel:jobResolverModel = new jobResolverModel()

  resolve(route: ActivatedRouteSnapshot, c: RouterStateSnapshot): Observable<boolean> {
    if(this.authenticationService.session.role ==='admin'){
      let requestObservable = this.httpService.requestJobResource({"update": {method: "PUT"}})
      requestObservable.subscribe(
          {
            next: (response:jobResolverModel) => {
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
