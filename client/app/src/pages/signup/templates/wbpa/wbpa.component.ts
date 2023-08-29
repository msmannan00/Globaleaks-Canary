import {Component, EventEmitter, Input, Output} from '@angular/core';
import * as Constants from "../../../../shared/constants/constants";
import {AppDataService} from "../../../../app-data.service";

@Component({
  selector: 'src-wbpa',
  templateUrl: './wbpa.component.html',
  styleUrls: ['./wbpa.component.css']
})
export class WbpaComponent {
  @Input() signup:any
  @Output() complete: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateSubdomain: EventEmitter<any> = new EventEmitter<any>();

  validated = false;
  confirmation_email: any;
  domainpattern: string = '^[a-z0-9]+$';

  protected readonly Constants = Constants;

  constructor(public appDataService:AppDataService) {
  }
}
