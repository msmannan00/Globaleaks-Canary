import {Injectable} from "@angular/core";
import {Resolve} from "@angular/router";
import {AuthenticationService} from "@app/services/authentication.service";
import {Observable, of} from "rxjs";
import {WBTipData} from "@app/models/whistleblower/WBTipData";
import {HttpService} from "@app/shared/services/http.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class WbTipResolver implements Resolve<boolean> {

  dataModel: WBTipData;

  constructor(private authenticationService: AuthenticationService, private httpService: HttpService) {
  }

  onReload(callback: () => void) {
    this.httpService.whistleBlowerTip().subscribe(
      (response: WBTipData) => {
        this.dataModel = response;
        callback();
      }
    );
  }

  resolve(): Observable<boolean> {

    if (!this.dataModel && this.authenticationService.session && this.authenticationService.session.role === "whistleblower") {
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
