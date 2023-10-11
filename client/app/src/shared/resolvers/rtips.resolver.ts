import { Injectable } from '@angular/core';
import {
  Resolve
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {HttpService} from "../services/http.service";
import { AuthenticationService } from 'app/src/services/authentication.service';
import {map} from "rxjs/operators";
import {rtipResolverModel} from "../../models/resolvers/rtipsResolverModel";

@Injectable({
  providedIn: 'root'
})
export class RtipsResolver implements Resolve<boolean> {
  dataModel: rtipResolverModel[] = []

  constructor(
    private httpService: HttpService,
    private authenticationService: AuthenticationService
  ) {}

  resolve(): Observable<boolean> {
    if (this.authenticationService.session.role === 'receiver') {
      return this.httpService.recieverTipResource().pipe(
        map((response: any) => {
          console.log(response)
          this.dataModel = response
          return true;
        })
      );
    }
    return of(true);
  }
}
