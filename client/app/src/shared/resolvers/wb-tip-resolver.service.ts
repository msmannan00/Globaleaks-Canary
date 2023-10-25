import {Injectable} from "@angular/core";
import {Resolve} from "@angular/router";
import {userResolverModel} from "@app/models/resolvers/userResolverModel";
import {AuthenticationService} from "@app/services/authentication.service";
import {Observable, of} from "rxjs";
import {WBTipData} from "@app/models/whistleblower/WBTipData";
import {HttpService} from "@app/shared/services/http.service";
import {AppDataService} from "@app/app-data.service";
import {WbtipService} from "@app/services/wbtip.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class WbTipResolver implements Resolve<boolean> {

  fields: any;
  score: number;
  tip: WBTipData = new WBTipData();
  dataModel: WBTipData;

  constructor(private authenticationService: AuthenticationService, private appDataService: AppDataService, private httpService: HttpService, private wbTipService: WbtipService) {
  }

  resolve(): Observable<boolean> {
    if (this.authenticationService.session && this.authenticationService.session.role === "whistleblower") {
      return this.httpService.whistleBlowerTip().pipe(
        map((response: WBTipData) => {
          this.dataModel = response;
          return true;
        })
      );
    }
    return of(true);
  }
}
