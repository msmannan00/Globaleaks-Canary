import { Injectable } from '@angular/core';
import {errorCodes} from "./models/app/error-code";
import {Root} from "./models/app/public-model";

@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  constructor() {

  }

  public = <Root>{};
  started = false;
  showLoadingPanel = false;
  errorCodes = new errorCodes()
  pageTitle = "Globaleaks"
  projectTitle = ""
  header_title = ""
  page = "homepage"
  languages_enabled = new Map<number, any>();
  sidebar = "";

  privacy_badge_open: boolean;
  languages_supported: Map<number, string>;
  connection: { tor: any };
  languages_enabled_selector: any[];
  ctx: string;
  receipt:string
  score: number;

  receivers_by_id:any = {}
  submissionStatuses: any;
  submission_statuses_by_id: any;
  contexts_by_id:any = {}
  questionnaires_by_id:any = {}
}
