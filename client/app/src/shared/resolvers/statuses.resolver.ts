import {Injectable} from "@angular/core";
import {Resolve,} from "@angular/router";
import {Observable, map, of} from "rxjs";
import {HttpService} from "@app/shared/services/http.service";
import {AuthenticationService} from "@app/services/authentication.service";
import {statuseResolverModel} from "@app/models/resolvers/statuseResolverModel";

@Injectable({
  providedIn: "root"
})
export class StatusResolver implements Resolve<boolean> {
  dataModel: statuseResolverModel = new statuseResolverModel();

  constructor(private httpService: HttpService, private authenticationService: AuthenticationService) {
  }

  resolve(): Observable<boolean> {
    if (this.authenticationService.session.role === "admin") {
      return this.httpService.requestStatusesResource().pipe(
        map((response: statuseResolverModel) => {
          this.dataModel = response;
          return true;
        })
      );
    }
    return of(true);
  }
}
