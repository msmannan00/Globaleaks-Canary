import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {HttpService} from "../services/internal/http.service";
import {preferenceResolverModel} from "../dataModels/resolvers/preferenceResolverModel";

@Injectable({
  providedIn: 'root'
})
export class PreferenceResolver implements Resolve<boolean> {

  dataModel:preferenceResolverModel = new preferenceResolverModel()

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let requestObservable = this.httpService.requestPreferenceResource({"update": {method: "PUT"}})

    requestObservable.subscribe(
      {
        next: (response:preferenceResolverModel) => {
          this.dataModel = response
        },
        error: (error: any) => {
        }
      }
    );
    return of(true);
  }

  constructor(public httpService: HttpService) {
  }
}
