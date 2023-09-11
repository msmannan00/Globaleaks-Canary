import { Injectable } from '@angular/core';
import { Resolve} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpService } from "../services/http.service";
import { AuthenticationService } from 'app/src/services/authentication.service';
import { fieldtemplatesResolverModel } from 'app/src/models/resolvers/fieldtemplateModel';

@Injectable({
  providedIn: 'root'
})
export class FieldtemplatesResolver implements Resolve<boolean> {
  dataModel: fieldtemplatesResolverModel = new fieldtemplatesResolverModel();

  constructor(
    private httpService: HttpService,
    private authenticationService: AuthenticationService
  ) {}

  resolve(): Observable<boolean> {
    if (this.authenticationService.session.role === 'admin') {
      return this.httpService.requestAdminFieldTemplateResource().pipe(
        map((response: fieldtemplatesResolverModel) => {
          this.dataModel = response;
          return true;
        }),
        catchError(() => {
          return of(true);
        })
      );
    }
    return of(true);
  }
}
