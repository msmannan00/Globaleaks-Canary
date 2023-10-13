import {Injectable} from "@angular/core";
import {
  Resolve,
} from "@angular/router";
import {Observable, of} from "rxjs";
import {HttpService} from "../services/http.service";
import {AuthenticationService} from "app/src/services/authentication.service";
import {networkResolverModel} from "app/src/models/resolvers/networkResolverModel";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class NetworkResolver implements Resolve<boolean> {
  dataModel: networkResolverModel = new networkResolverModel();

  constructor(private httpService: HttpService, private authenticationService: AuthenticationService) {
  }

  resolve(): Observable<boolean> {
    if (this.authenticationService.session.role === "admin") {
      return this.httpService.requestNetworkResource().pipe(
        map((response: networkResolverModel) => {
          this.dataModel = response;
          return true;
        })
      );
    }
    return of(true);
  }
}
