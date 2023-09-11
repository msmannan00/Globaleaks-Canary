import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot, Router
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpService } from "../services/http.service";
import { nodeResolverModel } from "../../models/resolvers/nodeResolverModel";
import { AuthenticationService } from 'app/src/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class NodeResolver implements Resolve<boolean> {

  dataModel: nodeResolverModel = new nodeResolverModel()

  resolve(route: ActivatedRouteSnapshot, c: RouterStateSnapshot): Observable<boolean> {
    if (this.authenticationService.session.role === 'admin' || 'receiver') {
      let requestObservable = this.httpService.requestNodeResource({ "update": { method: "PUT" } })
      requestObservable.subscribe(
        {
          next: (response: nodeResolverModel) => {
            this.dataModel = response
          },
          error: (error: any) => {
          }
        }
      );
    }
    return of(true);
  }

  constructor(public httpService: HttpService, private router: Router, public authenticationService: AuthenticationService) {
  }
}
