import {Injectable} from "@angular/core";
import {CanActivate, Router, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AppDataService} from "@app/app-data.service";

@Injectable({
  providedIn: "root"
})
export class Pageguard implements CanActivate {
  constructor(private router: Router, private appDataService: AppDataService) {
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.appDataService.page == "signuppage") {
      this.router.navigate(["/signup"]).then();
    }
    return true;
  }
}
