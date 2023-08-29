import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AppDataService} from "../../../app-data.service";
import {UtilsService} from "../../../shared/services/utils.service";
import {orderBy} from "lodash";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'src-context-selection',
  templateUrl: './context-selection.component.html',
  styleUrls: ['./context-selection.component.css']
})
export class ContextSelectionComponent {

  @Input() selectable_contexts:any
  @Input() contextsOrderPredicate:any
  @Output() selectContext: EventEmitter<any> = new EventEmitter();

  constructor(public appDataService:AppDataService,public utilsService:UtilsService) {
  }
}
