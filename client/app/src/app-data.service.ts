import { Injectable } from '@angular/core';
import {errorCodes} from "./dataModels/app/error-code";
import {Root} from "./dataModels/app/public-model";

@Injectable({
  providedIn: 'root'
})
export class AppDataService {

  public_node = <Root>{};
  appStarted:boolean = false;
  showLoadingPanel:boolean = false;
  sidebar = null;
  errorCodes = new errorCodes()
  pageTitle = "Globaleaks"
  projectTitle = ""
  header_title = ""
  page = ""
  constructor() { }
}
