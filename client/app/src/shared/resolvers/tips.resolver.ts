import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {HttpService} from "../services/http.service";
import {AuthenticationService} from "../../services/authentication.service";
import {tipsResolverModel} from "../../models/resolvers/tipsResolverModel";

@Injectable({
  providedIn: 'root'
})
export class TipsResolver implements Resolve<boolean> {
  dataModel:tipsResolverModel = new tipsResolverModel()

  resolve(route: ActivatedRouteSnapshot, c: RouterStateSnapshot): Observable<boolean> {
    if(this.authenticationService.session.role ==='admin'){
      let requestObservable = this.httpService.requestTipResource({"update": {method: "PUT"}})
      requestObservable.subscribe(
          {
            next: (response:tipsResolverModel) => {
              console.log(JSON.stringify(response))
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
