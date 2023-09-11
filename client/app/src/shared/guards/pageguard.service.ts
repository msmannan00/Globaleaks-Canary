import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AppDataService} from "../../app-data.service";

@Injectable({
  providedIn: 'root'
})
export class Pageguard implements CanActivate {
  constructor(private router: Router, private appDataService:AppDataService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.appDataService.page == "signuppage"){
      this.router.navigate(["/signup"]);
    }

    return true;
  }
}
