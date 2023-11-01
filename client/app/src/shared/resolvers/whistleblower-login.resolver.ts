import { Injectable } from '@angular/core';
import {
  Resolve,
} from '@angular/router';
import {AppDataService} from "@app/app-data.service";
import {AuthenticationService} from "@app/services/authentication.service";
import { Observable, of } from 'rxjs';

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
