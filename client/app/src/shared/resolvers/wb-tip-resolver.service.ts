import {Injectable} from "@angular/core";
import {Resolve} from "@angular/router";
import {Observable, of} from "rxjs";
import {WBTipData} from "@app/models/whistleblower/WBTipData";
import {HttpService} from "@app/shared/services/http.service";
import {AppDataService} from "@app/app-data.service";
import {WbtipService} from "@app/services/wbtip.service";

@Injectable({
  providedIn: "root"
})
export class WbTipResolver implements Resolve<boolean> {

  fields: any;
  score: number;
  tip: WBTipData = new WBTipData();

  constructor(private appDataService: AppDataService, private httpService: HttpService, private wbTipService: WbtipService) {
  }

  resolve(): Observable<boolean> {

    let requestObservable: Observable<any> = this.httpService.whistleBlowerTip();
    requestObservable.subscribe(
      {
        next: (response: WBTipData) => {
          this.tip = response;

          this.tip.context = this.appDataService.contexts_by_id[this.tip.context_id];
          this.tip.questionnaire = this.appDataService.questionnaires_by_id[this.tip.context["questionnaire_id"]];
          this.tip.additional_questionnaire = this.appDataService.questionnaires_by_id[this.tip.context["questionnaire_id"]];
          this.tip.msg_receiver_selected = null;
          this.tip.msg_receivers_selector = [];

          let self = this;
          this.tip.receivers.forEach(function (r: any) {
            if (self.appDataService.receivers_by_id[r.id]) {
              r = self.appDataService.receivers_by_id[r.id];
              self.tip.msg_receivers_selector.push({
                key: r.id,
                value: r.name
              });
            }
          });

          this.wbTipService.tip = this.tip;
        }
      });

    return of(true);
  }
}
