import {Injectable} from "@angular/core";
import {
  Resolve
} from "@angular/router";
import {Observable, of} from "rxjs";
import {HttpService} from "../services/http.service";
import {AuthenticationService} from "app/src/services/authentication.service";
import {questionnaireResolverModel} from "app/src/models/resolvers/questionnaireModel";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class QuestionnairesResolver implements Resolve<boolean> {
  dataModel: questionnaireResolverModel = new questionnaireResolverModel();

  constructor(private httpService: HttpService, private authenticationService: AuthenticationService) {
  }

  resolve(): Observable<boolean> {
    if (this.authenticationService.session.role === "admin") {
      return this.httpService.requestQuestionnairesResource().pipe(
        map((response: questionnaireResolverModel) => {
          this.dataModel = response;
          return true;
        })
      );
    }
    return of(true);
  }
}
