import {Injectable} from "@angular/core";
import {Router, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AuthenticationService} from "@app/services/helper/authentication.service";
import {AppDataService} from "@app/app-data.service";
import {UtilsService} from "@app/shared/services/utils.service";

@Injectable({
  providedIn: "root"
})
export class SessionGuard {
  constructor(private router: Router, private appDataService: AppDataService, public authenticationService: AuthenticationService, protected utilsService: UtilsService) {
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authenticationService.session) {
      this.utilsService.routeGuardRedirect();
      return false;
    } else {
      this.appDataService.page = this.router.url;
      return true;
    }
  }
}
