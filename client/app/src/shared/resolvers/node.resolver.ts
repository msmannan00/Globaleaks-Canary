import {Injectable} from "@angular/core";
import {
  Resolve
} from "@angular/router";
import {Observable, of} from "rxjs";
import {HttpService} from "../services/http.service";
import {nodeResolverModel} from "@app/models/resolvers/nodeResolverModel";
import {AuthenticationService} from "app/src/services/authentication.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class NodeResolver implements Resolve<boolean> {
  dataModel: nodeResolverModel = new nodeResolverModel();

  constructor(private httpService: HttpService, private authenticationService: AuthenticationService) {
  }

  resolve(): Observable<boolean> {
    if (this.authenticationService.session.role === "admin") {
      return this.httpService.requestNodeResource().pipe(
        map((response: nodeResolverModel) => {
          this.dataModel = response;
          return true;
        })
      );
    }
    return of(true);
  }
}
