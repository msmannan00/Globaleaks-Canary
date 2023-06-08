import { Injectable } from '@angular/core';
import {errorCodes} from "./models/app/error-code";
import {Root} from "./models/app/public-model";

@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  public = <Root>{};
  started:boolean = false;
  showLoadingPanel:boolean = false;
  sidebar = null;
  errorCodes = new errorCodes()
  pageTitle = "Globaleaks"
  projectTitle = ""
  header_title = ""
  page = "homepage"

  contexts_by_id:any = {}
  receivers_by_id:any={}
  questionnaires_by_id:any={}
  submission_statuses: any;
  submission_statuses_by_id: any;
  connection: { tor: any };
  privacy_badge_open: boolean;
  languages_enabled_selector: any[];
  languages_enabled = new Map<number, any>();
  languages_supported: Map<number, string>;
  score: number;
  ctx: string;
  receipt:string


  constructor() { }
}
