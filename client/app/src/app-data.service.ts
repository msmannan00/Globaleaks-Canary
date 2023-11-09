import {Injectable} from "@angular/core";
import {ErrorCodes} from "@app/models/app/error-code";
import {Root} from "@app/models/app/public-model";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AppDataService {

  private showLoadingPanelSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  showLoadingPanel$: Observable<boolean> = this.showLoadingPanelSubject.asObservable();
  updateShowLoadingPanel(newValue: boolean) {
    this.showLoadingPanelSubject.next(newValue);
  }

  public = <Root>{};
  started = false;
  errorCodes = new ErrorCodes();
  pageTitle = "Globaleaks";
  projectTitle = "";
  header_title = "";
  page = "homepage";
  languages_enabled = new Map<number, any>();
  sidebar = "";

  privacy_badge_open: boolean;
  languages_supported: Map<number, string>;
  connection: { tor: any };
  languages_enabled_selector: any[];
  ctx: string;
  receipt: string;
  score: number;

  receivers_by_id: any = {};
  submissionStatuses: any;
  submission_statuses_by_id: any;
  contexts_by_id: any = {};
  questionnaires_by_id: any = {};
}
