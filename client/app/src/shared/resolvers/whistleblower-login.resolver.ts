import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {AppDataService} from "@app/app-data.service";
import {WBTipData} from "@app/models/whistleblower/WBTipData";
import {AuthenticationService} from "@app/services/authentication.service";
import {HttpService} from "@app/shared/services/http.service";
import { Observable, of } from 'rxjs';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class WhistleblowerLoginResolver implements Resolve<boolean> {
  loggedIn = false;

  constructor(private appDataService: AppDataService, private authenticationService: AuthenticationService) {
  }

  resolve(): Observable<boolean> {
    if (this.appDataService.page == 'submissionpage') {
      this.loggedIn = true;
      setTimeout(() => {
        this.authenticationService.login(0, "whistleblower", "")
      }, 0);
    }
    return of(true);
  }
}
