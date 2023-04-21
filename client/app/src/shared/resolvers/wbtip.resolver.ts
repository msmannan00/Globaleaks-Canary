import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {WBTipData} from "../../models/whistleblower/WBTipData";
import {HttpService} from "../services/http.service";
import {AppDataService} from "../../app-data.service";
import {WbtipService} from "../../services/wbtip.service";

@Injectable({
  providedIn: 'root'
})
export class WbtipResolver implements Resolve<boolean> {

  fields:any
  score: number;
  tip:WBTipData = new WBTipData()

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    alert("xxsasd3")

    let requestObservable:Observable<any> = this.httpService.whistleBlowerTip({})
    requestObservable.subscribe(
        {
          next: (response:WBTipData) => {
            this.tip = response;

            this.tip.context = this.appDataService.contexts_by_id[this.tip.context_id];
            this.tip.questionnaire = this.appDataService.questionnaires_by_id[this.tip.context['questionnaire_id']];
            this.tip.additional_questionnaire = this.appDataService.questionnaires_by_id[this.tip.context['questionnaire_id']];
            this.tip.msg_receiver_selected = null;
            this.tip.msg_receivers_selector = [];

            let self = this
            this.tip.receivers.forEach(function(r:any){
              if(self.appDataService.receivers_by_id[r.id]) {
                r = self.appDataService.receivers_by_id[r.id];
                self.tip.msg_receivers_selector.push({
                  key: r.id,
                  value: r.name
                });
              }
            });

            this.wbtipService.tip = this.tip;
            alert("asd2")
          },
          error: (error: any) => {
            alert(JSON.stringify(error))
            alert("asd3")
          }
        })

    return of(true);
  }

  constructor(public appDataService:AppDataService, public httpService: HttpService, private router: Router, private wbtipService:WbtipService) {
  }

}
