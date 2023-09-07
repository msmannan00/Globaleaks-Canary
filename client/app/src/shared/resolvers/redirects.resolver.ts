import { Injectable } from '@angular/core';
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot, Router
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {HttpService} from "../services/http.service";
import { AuthenticationService } from 'app/src/services/authentication.service';
import { redirectResolverModel } from 'app/src/models/resolvers/redirectResolverModel';

@Injectable({
  providedIn: 'root'
})
export class RedirectsResolver implements Resolve<boolean> {

  dataModel:redirectResolverModel = new redirectResolverModel()

  resolve(route: ActivatedRouteSnapshot, c: RouterStateSnapshot): Observable<boolean> {
    if(this.authenticationService.session.role ==='admin'){
    let requestObservable = this.httpService.requestRedirectsResource({"update": {method: "PUT"}})
    requestObservable.subscribe(
        {
            next: (response:redirectResolverModel) => {
                this.dataModel = response
                // if (this.dataModel.password_change_needed) {
                //     this.router.navigate(["/action/forcedpasswordchange"]);
                // } else if (this.dataModel.require_two_factor) {
                //     this.router.navigate(["/action/forcedtwofactor"]);
                // }
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
