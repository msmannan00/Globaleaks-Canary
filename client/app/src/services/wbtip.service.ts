import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpService} from "../shared/services/http.service";
import {WBTipData} from "../models/whistleblower/WBTipData";
import {AppDataService} from "../app-data.service";
import {UtilsService} from "../shared/services/utils.service";

@Injectable({
  providedIn: 'root'
})
export class WbtipService {

  fields:any
  tip:WBTipData = new WBTipData()
  score: number;

  initialize(response:WBTipData) {
    this.tip = response;
    this.tip.context = this.appDataService.contexts_by_id[this.tip.context_id];
    this.tip.questionnaire = this.appDataService.questionnaires_by_id[this.tip.context['questionnaire_id']];

    this.tip.additional_questionnaire = this.appDataService.questionnaires_by_id[this.tip.context['additional_questionnaire_id']];

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
  }

  newCommentContent(){

  }

  newMessages(content:string){
    const param=JSON.stringify({"id":this.tip.msg_receiver_selected, "content":content});
    this.httpService.requestNewMessage(JSON.stringify({"id":this.tip.msg_receiver_selected, "content":content}), this.tip.msg_receiver_selected).subscribe
    (
        {
          next: response => {
            this.utilsService.reloadCurrentRoute()
          },
          error: (error: any) => {
          }
        }
    );
  }

  newComment(content:string) {
    const param=JSON.stringify({"id":this.tip.msg_receiver_selected, "content":content});
    this.httpService.requestNewComment(JSON.stringify({"id":this.tip.msg_receiver_selected, "content":content})).subscribe
    (
        {
          next: response => {
            this.utilsService.reloadCurrentRoute()
          },
          error: (error: any) => {
          }
        }
    );
  }

  constructor(private httpService:HttpService, public appDataService:AppDataService, public utilsService:UtilsService) {
  }
}
