import { Injectable } from '@angular/core';
import { AuthenticationService } from "../../services/authentication.service";
import { AppDataService } from "../../app-data.service";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { RequestSupportComponent } from "../modals/request-support/request-support.component";
import { HttpService } from "./http.service";
import { TokenResource } from './token-resource.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from 'rxjs';
import { ConfirmationWithPasswordComponent } from '../modals/confirmation-with-password/confirmation-with-password.component';
import { ConfirmationWith2faComponent } from '../modals/confirmation-with2fa/confirmation-with2fa.component';
import { PreferenceResolver } from '../resolvers/preference.resolver';
import { DeleteConfirmationComponent } from '../modals/delete-confirmation/delete-confirmation.component';
import { NodeResolver } from "../resolvers/node.resolver";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private nodeResolver: NodeResolver,
    private utilsService: UtilsService,
    private http: HttpClient,
    public translateService: TranslateService,
    public httpService: HttpService,
    public modalService: NgbModal,
    public authenticationService: AuthenticationService,
    public appDataService: AppDataService,
    public preferenceResolver: PreferenceResolver,
    public tokenResourceService: TokenResource,
    private router: Router) {

  }
  updateNode() {
    this.httpService.updateNodeResource(this.nodeResolver.dataModel).subscribe();
  }

  str2Uint8Array(str: string) {
    let result = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) {
      result[i] = str.charCodeAt(i);
    }
    return result;
  }

  newItemOrder(objects: any[], key: string): number {
    if (objects.length === 0) {
      return 0;
    }

    let max = 0;
    objects.forEach(object => {
      if (object[key] > max) {
        max = object[key];
      }
    });

    return max + 1;
  }

  role_l10n(role: string) {
    var ret = "";

    if (role) {
      ret = role === "receiver" ? "recipient" : role;
      ret = ret.charAt(0).toUpperCase() + ret.substr(1)
    }

    return ret;
  }

  download(url: string): void {
    this.tokenResourceService.getWithProofOfWork().then((token: any) => {
      window.open(`${url}?token=${token.id}:${token.answer}`);
    });
  }

  isUploading(uploads?: any) {
    if (uploads) {
      for (let key in uploads) {
        if (uploads[key].flowFile && uploads[key].flowFile.isUploading()) {
          return true;
        }
      }
    }
    return false;
  }

  resumeFileUploads(uploads: any) {
    if (uploads) {
      for (let key in uploads) {
        if (uploads[key] && uploads[key].flowJs) {
          uploads[key].flowJs.upload()
        }
      }
    }
  }

  view(url: string, mimetype: string, callback: (blob: Blob) => void): void {
    const headers = new HttpHeaders({
      'x-session': this.authenticationService.session.id
    });

    this.http.get(url, {
      headers: headers,
      responseType: 'blob'
    }).subscribe(
      (response: Blob) => {
        callback(response);
      }
    );
  }

  getCardSize(num: number) {
    if (num < 2) {
      return "col-md-12";
    } else if (num === 2) {
      return "col-md-6";
    } else if (num === 3) {
      return "col-md-4";
    } else {
      return "col-md-3 col-sm-6";
    }
  }

  scrollToTop() {
    document.documentElement.scrollTop = 0;
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('routing', { skipLocationChange: true, replaceUrl: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  showWBLoginBox() {
    return location.pathname === "/submission";
  }
  showUserStatusBox() {
    return this.appDataService.public.node.wizard_done &&
      this.appDataService.page !== "homepage" &&
      this.appDataService.page !== "submissionpage" &&
      this.authenticationService.session &&
      !this.authenticationService.session.require_password_change;
  }

  isWhistleblowerPage() {
    return ["/", "/submission"].indexOf(this.router.url) !== -1;
  }

  stopPropagation(event: Event) {
    event.stopPropagation()
  }
  encodeString(string: string): string {
    const codeUnits = Uint16Array.from(
      { length: string.length },
      (element, index) => string.charCodeAt(index)
    );

    const charCodes = new Uint8Array(codeUnits.buffer);

    let result = "";
    charCodes.forEach((char) => {
      result += String.fromCharCode(char);
    });

    return btoa(result);
  }
  openConfirmableModalDialog(arg: any, scope: any): Promise<any> {
    scope = !scope ? this : scope;

    const modalRef = this.modalService.open(DeleteConfirmationComponent);
    modalRef.componentInstance.arg = arg;
    modalRef.componentInstance.scope = scope;
    modalRef.componentInstance.confirmFunction = () => {
      return this.runAdminOperation("reset_submissions", {}, true);
    };
    return modalRef.result;
  }

  openSupportModal() {
    if (this.appDataService.public.node.custom_support_url) {
      window.open(this.appDataService.public.node.custom_support_url, "_blank");
    } else {
      this.modalService.open(RequestSupportComponent);
    }
  }

  routeCheck() {
    let path = location.pathname;
    if (path !== "/") {
      this.appDataService.page = ""
    }

    if (!this.appDataService.public) {
      return;
    }

    if (path === "/" && this.appDataService.public.node.enable_signup) {
      this.appDataService.page = "signuppage"
    } else if ((path === "/" || path === "/submission") && this.appDataService.public.node.adminonly && !this.authenticationService.session) {
      location.replace("/admin");
    }
  }

  array_to_map(receivers: any) {
    let ret: any = {};

    receivers.forEach(function (element: any) {
      ret[element.id] = element
    });

    return ret;
  }

  copyToClipboard(data: string) {
    if (window.navigator.clipboard && window.isSecureContext) {
      window.navigator.clipboard.writeText(data);
    }
  }

  getSubmissionStatusText(status: any, substatus: any, submission_statuses: any) {
    let text;
    for (let i = 0; i < submission_statuses.length; i++) {
      if (submission_statuses[i].id === status) {
        text = submission_statuses[i].label;


        let substatuses = submission_statuses[i].substatuses;
        for (let j = 0; j < substatuses.length; j++) {
          if (substatuses[j].id === substatus) {
            text += "(" + substatuses[j].label + ")";
            break;
          }
        }
        break;
      }
    }
    return text;
  }

  isNever(time: string) {
    let date = new Date(time);
    return date.getTime() === 32503680000000;
  }

  deleteFromList(list: any, elem: any) {
    let idx = list.indexOf(elem);
    if (idx !== -1) {
      list.splice(idx, 1);
    }
  }

  showFilePreview(content_type: string) {
    let content_types = [
      "image/gif",
      "image/jpeg",
      "image/png",
      "image/bmp"
    ];

    return content_types.indexOf(content_type) > -1;
  }

  submitSupportRequest(arg: any) {
    const param = JSON.stringify({ "mail_address": arg.mail_address, "text": arg.text, "url": location.pathname });
    this.httpService.requestSuppor(param).subscribe();
  }

  runUserOperation(operation: string, args: any, refresh: boolean) {
    return this.httpService.runOperation("api/user/operations", operation, args, refresh);
  }
  runRecipientOperation(operation: string, args: any, refresh: boolean) {
    return this.httpService.runOperation("api/recipient/operations", operation, args, refresh);
  }

  go(path: string): void {
    this.router.navigateByUrl(path);
  }
  maskScore(score: number) {
    if (score === 1) {
      return this.translateService.instant('Low');
    } else if (score === 2) {
      return this.translateService.instant('Medium');
    } else if (score === 3) {
      return this.translateService.instant('High');
    } else {
      return this.translateService.instant('None');
    }
  }

  getStaticFilter(data: any[], model: any[], key: string): any[] {
    if (model.length === 0) {
      return data;
    } else {
      const rows: any[] = [];
      data.forEach(data_row => {
        model.forEach(selected_option => {
          if (key === 'score') {
            const scoreLabel = this.maskScore(data_row[key]);
            if (scoreLabel === selected_option.label) {
              rows.push(data_row);
            }
          } else if (key === 'status') {
            if (data_row[key] === selected_option.label) {
              rows.push(data_row);
            }
          } else {
            if (data_row[key] === selected_option.label) {
              rows.push(data_row);
            }
          }
        });
      });
      return rows;
    }
  }
  getDateFilter(Tips: any[], report_date_filter: number[], update_date_filter: number[], expiry_date_filter: number[]): any[] {
    const filteredTips: any[] = [];
    Tips.forEach(rows => {
      const m_row_rdate = new Date(rows.last_access).getTime();
      const m_row_udate = new Date(rows.update_date).getTime();
      const m_row_edate = new Date(rows.expiration_date).getTime();

      if (
        (report_date_filter === null || (report_date_filter[0] === 0 || (m_row_rdate > report_date_filter[0] && m_row_rdate < report_date_filter[1]))) &&
        (update_date_filter === null || (update_date_filter[0] === 0 || (m_row_udate > update_date_filter[0] && m_row_udate < update_date_filter[1]))) &&
        (expiry_date_filter === null || (expiry_date_filter[0] === 0 || (m_row_edate > expiry_date_filter[0] && m_row_edate < expiry_date_filter[1])))
      ) {
        filteredTips.push(rows);
      }
    });

    return filteredTips;
  }
  print() {
    window.print();
  }

  saveAs(filename: string, url: string): void {

    const headers = new HttpHeaders({
      'X-Session': this.authenticationService.session.id
    });

    this.http.get(url, { responseType: 'blob', headers: headers }).subscribe(
      response => {
        const blob = new Blob([response], { type: 'application/octet-stream' });
        const blobUrl = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = blobUrl;
        a.download = filename;
        a.click();

        setTimeout(() => {
          URL.revokeObjectURL(blobUrl);
        }, 1000);
      }
    );
  }
  getPostponeDate(ttl: any): Date {
    const date = new Date();
    date.setDate(date.getDate() + ttl + 1);
    date.setUTCHours(0, 0, 0, 0);
    return date;
  }
  update(node: any) {
    return this.httpService.requestUpdateAdminNodeResource(node)
  }
  AdminL10NResource(lang: any) {
    return this.httpService.requestAdminL10NResource(lang)
  }
  updateAdminL10NResource(data: any, lang: any) {
    return this.httpService.requestUpdateAdminL10NResource(data, lang)
  }
  DefaultL10NResource(lang: any) {
    return this.httpService.requestDefaultL10NResource(lang)
  }

  runAdminOperation(operation: any, args: any, refresh: any) {
    return this.runOperation("api/admin/config", operation, args, refresh);
  }
  deleteDialog() {
    return this.openConfirmableModalDialog("", "")
  }
  runOperation(api: string, operation: string, args?: any, refresh?: boolean): Promise<void> {
    const deferred = new Subject<void>();

    const requireConfirmation = [
      "enable_encryption",
      "disable_2fa",
      "get_recovery_key",
      "toggle_escrow",
      "toggle_user_escrow",
      "reset_submissions"
    ];

    if (!args) {
      args = {};
    }

    if (!refresh) {
      refresh = false;
    }

    if (requireConfirmation.indexOf(operation) !== -1) {
      const confirm = (secret: string) => {
        const headers =  new HttpHeaders({ "X-Confirmation": secret });
        return this.http.put(api, {
          "operation": operation,
          "args": args
        }, { headers }).toPromise().then(
          (response: any) => {
            if (refresh) {
              this.reloadCurrentRoute();
            }
            deferred.next(response);
          },
          () => { this.getConfirmation(confirm); }
        );
      };

      this.getConfirmation(confirm);
    } else {
      this.http.put(api, {
        "operation": operation,
        "args": args
      }).toPromise().then(
        (response: any) => {
          if (refresh) {
            this.reloadCurrentRoute();
          }
          deferred.next(response);
        },
        () => { }
      );
    }

    return deferred.toPromise();
  }
  getConfirmation(confirmFun: (secret: string) => Promise<void>): void {
    var modalRef = this.modalService.open(ConfirmationWithPasswordComponent, {});
    if (this.preferenceResolver.dataModel.two_factor) {
      modalRef = this.modalService.open(ConfirmationWith2faComponent, {});
    }

    modalRef.componentInstance.confirmFunction = (secret: string) => {
      confirmFun(secret).then(
        () => { },
        () => { this.getConfirmation(confirmFun); }
      );
    };
  }
  getFiles(): Observable<any[]> {
    return this.http.get<any[]>("api/admin/files");
  }
  deleteFile(url: string): Observable<void> {
    return this.http.delete<void>(url);
  }
  deleteAdminUser(user_id: any) {
    return this.httpService.requestDeleteAdminUser(user_id)
  }
  deleteAdminContext(user_id: any) {
    return this.httpService.requestDeleteAdminContext(user_id)
  }
  deleteStatus(user_id: any) {
    return this.httpService.requestDeleteStatus(user_id)
  }

  deleteSubStatus(url: string) {
    return this.httpService.requestDeleteStatus(url)
  }

  addAdminUser(user: any) {
    return this.httpService.requestAddAdminUser(user)
  }
  updateAdminUser(id: any, user: any) {
    return this.httpService.requestUpdateAdminUser(id, user)
  }
  addAdminContext(context: any) {
    return this.httpService.requestAddAdminContext(context)
  }
  updateAdminContext(context: any, id: any) {
    return this.httpService.requestUpdateAdminContext(context, id)
  }
  updateAdminNotification(notification: any) {
    return this.httpService.requestUpdateAdminNotification(notification)
  }
  readFileAsText(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target) {
          resolve(event.target.result as string);
        } else {
          reject(new Error("Event target is null."));
        }
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsText(file);
    });
  }
  moveUp(elem: any): void {
    elem[this.getYOrderProperty(elem)] -= 1;
  }
  
  moveDown(elem: any): void {
    elem[this.getYOrderProperty(elem)] += 1;
  }
  
  moveLeft(elem: any): void {
    elem[this.getXOrderProperty(elem)] -= 1;
  }
  
  moveRight(elem: any): void {
    elem[this.getXOrderProperty(elem)] += 1;
  }
  
  getXOrderProperty(elem:any): string {
    return "x";
  }
  getYOrderProperty(elem: any): string {
    let key = "order";
    if (typeof elem[key] === "undefined") {
      key = "y";
    }
    return key;
  }
  
  assignUniqueOrderIndex(elements: any[]): void {
    if (elements.length <= 0) {
      return;
    }

    const key = this.getYOrderProperty(elements[0]);
    if (elements.length) {
      let i = 0;
      elements = elements.sort((a, b) => a[key] - b[key]);
      elements.forEach((element) => {
        element[key] = i;
        i += 1;
      });
    }
  }
}
