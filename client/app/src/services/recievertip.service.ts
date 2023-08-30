import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpService} from "../shared/services/http.service";
import {AppDataService} from "../app-data.service";
import {UtilsService} from "../shared/services/utils.service";
import { RecieverTipData } from '../models/reciever/RecieverTipData';

@Injectable({
  providedIn: 'root'
})
export class RecieverTipService {

  fields:any
  tip:RecieverTipData = new RecieverTipData()
  score: number;

  initialize(response:RecieverTipData) {
    this.tip = response;
    this.tip.context = this.appDataService.contexts_by_id[this.tip.context_id];
    this.tip.questionnaire = this.appDataService.questionnaires_by_id[this.tip.context['questionnaire_id']];

    // this.tip.additional_questionnaire = this.appDataService.questionnaires_by_id[this.tip.context['additional_questionnaire_id']];
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
    this.httpService.retipRequestNewMessage(JSON.stringify({"id":this.tip.msg_receiver_selected, "content":content}), this.tip.id).subscribe
    (
        {
          next: response => {
            this.utilsService.reloadCurrentRoute();alert("y7");
          },
          error: (error: any) => {
          }
        }
    );
  }

    operation(url:string, operation:string, args:any) {
        return this.httpService.runOperation(url, operation, args, false).subscribe({
            next: response => {
            }
        });
   };

    newComment(content:string) {
    const param=JSON.stringify({"id":this.tip.msg_receiver_selected, "content":content});
    this.httpService.rtipsRequestNewComment(param,this.tip.id).subscribe
    (
        {
          next: response => {
            this.utilsService.reloadCurrentRoute();alert("y8");
          },
          error: (error: any) => {
          }
        }
    );
  }

  constructor(private httpService:HttpService, public appDataService:AppDataService, public utilsService:UtilsService) {
  }
}
