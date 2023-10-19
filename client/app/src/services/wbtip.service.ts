import {Injectable} from "@angular/core";
import {HttpService} from "@app/shared/services/http.service";
import {WBTipData} from "@app/models/whistleblower/WBTipData";
import {AppDataService} from "@app/app-data.service";
import {UtilsService} from "@app/shared/services/utils.service";

@Injectable({
  providedIn: "root"
})
export class WbtipService {
  tip: WBTipData = new WBTipData();

  constructor(private httpService: HttpService, private appDataService: AppDataService, private utilsService: UtilsService) {
  }

  initialize(response: WBTipData) {
    this.tip = response;
    this.tip.context = this.appDataService.contexts_by_id[this.tip.context_id];
    this.tip.questionnaire = this.appDataService.questionnaires_by_id[this.tip.context["questionnaire_id"]];
    this.tip.additional_questionnaire = this.appDataService.questionnaires_by_id[this.tip.context["additional_questionnaire_id"]];
    this.tip.msg_receiver_selected = null;
    this.tip.msg_receivers_selector = [];

    this.tip.receivers.forEach((r: any) => {
      const receiver = this.appDataService.receivers_by_id[r.id];
      if (receiver) {
        this.tip.msg_receivers_selector.push({
          key: receiver.id,
          value: receiver.name
        });
      }
    });
  }

  sendContent(content: string, visibility: string) {
    const requestData = JSON.stringify({
      "id": this.tip.msg_receiver_selected,
      "content": content,
      "visibility": visibility
    });

    const request = this.httpService.requestNewComment(requestData);
    request.subscribe({
      next: () => {
        this.utilsService.reloadCurrentRoute();
      }
    });
  }


  newComment(content: string, visibility: string) {
    this.sendContent(content, visibility);
  }
}
