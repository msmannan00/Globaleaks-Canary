import { Injectable } from '@angular/core';
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot, Router
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {HttpService} from "../services/http.service";
import {rtipsResolverModel} from "../../models/resolvers/rtipsResolverModel";
import { AuthenticationService } from 'app/src/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RtipsResolver implements Resolve<boolean> {

  dataModel:rtipsResolverModel = new rtipsResolverModel()
  

  resolve(route: ActivatedRouteSnapshot, c: RouterStateSnapshot): Observable<boolean> {
    if(this.authenticationService.isSessionActive()){
    let requestObservable = this.httpService.recieverTipResource({"update": {method: "PUT"}})
    requestObservable.subscribe(
        {
            next: (response:rtipsResolverModel) => {
                this.dataModel=response;
              },
            error: (error: any) => {
              alert(JSON.stringify(error))
            }
        }
    );
  }
  return of(true);
  }

  constructor(public httpService: HttpService, private router: Router, public authenticationService:AuthenticationService) {
}
}
