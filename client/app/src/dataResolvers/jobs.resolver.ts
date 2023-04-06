import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {HttpService} from "../services/internal/http.service";

@Injectable({
  providedIn: 'root'
})
export class JobsResolver implements Resolve<boolean> {

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let requestObservable = this.httpService.requestJobResource({"update": {method: "PUT"}})

    requestObservable.subscribe(
      {
        next: response => {
        },
        error: (error: any) => {
          alert("Resolve Error : " + JSON.stringify(error))
        }
      }
    );
    return of(true);
  }

  constructor(public httpService: HttpService) {
  }
}
