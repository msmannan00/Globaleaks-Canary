import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from "./services/authentication.service";
import {AppDataService} from "./app-data.service";

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.appDataService.page = this.router.url

    if(this.authentication.session === undefined){
      this.router.navigate(['/login']).then(r => {});
      return false;
    }else {
      return true;
    }

  }
  constructor(public authentication: AuthenticationService, private router: Router, private appDataService:AppDataService) {
  }

}
