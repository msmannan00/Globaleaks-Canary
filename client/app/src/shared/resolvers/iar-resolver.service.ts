import {Injectable} from "@angular/core";
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from "@angular/router";
import {Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {HttpService} from "../services/http.service";
import {AuthenticationService} from "@app/services/authentication.service";
import {IarData} from "@app/models/reciever/IarData";

@Injectable({
  providedIn: "root"
})
export class IarResolver implements Resolve<boolean> {
  dataModel: IarData[] = [];

  constructor(
    private httpService: HttpService,
    private authenticationService: AuthenticationService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    if (this.authenticationService.session.role === "custodian") {
      return this.httpService.iarResource().pipe(
        map((response: IarData[]) => {
          this.dataModel = response;
          return true;
        })
      );
    }
    return of(true);
  }
}
