import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { password_recovery_response_model } from "../../models/authentication/password_recovery_response_model";
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  getPublicResource(): Observable<any> {
    return this.httpClient.get<any>("/api/public", { observe: 'response' });
  }

  requestAuthTokenLogin(param: string): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.post("api/tokenauth", param, { 'headers': headers })
  }

  requestGeneralLogin(param: string): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.post("api/authentication", param, { 'headers': headers })
  }

  requestWhistleBlowerLogin(param: string): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.post("api/receiptauth", param, { 'headers': headers })
  }

  requestDeleteSession(): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.delete("api/session", { 'headers': headers })
  }

  requestDeleteTenant(url: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.delete(url, { 'headers': headers })
  }

  requestUpdateTenant(url: any, data: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.put(url, data, { 'headers': headers })
  }

  deleteDBFile(id: string): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.delete("api/wbfile/" + id, { 'headers': headers })
  }

  requestOperations(data: any, header?: any): Observable<any> {
    let headers = { 'content-type': 'application/json' }
    if (header) {
      headers = header
    }

    return this.httpClient.put("api/user/operations", data, { headers })
  }

  updatePreferenceResource(data: any, header?: any): Observable<any> {
    let headers = { 'content-type': 'application/json' }
    return this.httpClient.put("api/preferences", data, { headers })
  }

  requestChangePassword(param: string): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.put<password_recovery_response_model>("api/reset/password", param, { 'headers': headers })
  }

  requestToken(param: string): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.post("api/token", param, { 'headers': headers })
  }

  requestResetLogin(param: string): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.post("api/reset/password", param, { 'headers': headers })
  }

  requestSignup(param: string): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.post("api/signup", param, { 'headers': headers })
  }

  requestWizard(param: string): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.post("api/wizard", param, { 'headers': headers })
  }

  requestSignupToken(token: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.get("api/signup/" + token, { 'headers': headers })
  }

  requestTenantSwitch(url: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.get(url, { 'headers': headers })
  }

  requestReportSubmission(param: string): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.post("api/submission", param, { 'headers': headers })
  }

  requestSuppor(param: string): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.post("api/support", param, { 'headers': headers })
  }
  requestNewComment(param: string): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.post("api/wbtip/comments", param, { 'headers': headers })
  }

  requestNewMessage(param: string, suburl: string): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.post("api/wbtip/messages/" + suburl, param, { 'headers': headers })
  }

  requestPreferenceResource(param: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.get("api/preferences", { 'headers': headers })
  }

  requestNodeResource(param: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.get("api/admin/node", { 'headers': headers })
  }

  updateNodeResource(data: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.put("api/admin/node", data, { headers })
  }

  requestUsersResource(param: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.get("api/admin/users", { 'headers': headers })
  }
  requestContextsResource(param: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.get("api/admin/contexts", { 'headers': headers })
  }
  requestTenantsResource(param: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.get("api/admin/tenants", { 'headers': headers })
  }
  requestQuestionnairesResource(param: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.get("api/admin/questionnaires", { 'headers': headers })
  }
  requestTipResource(param: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.get("api/admin/auditlog/tips", { 'headers': headers })
  }
  requestNotificationsResource(param: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.get("api/admin/notification", { 'headers': headers })
  }
  requestSubmissionStatusResource(param: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.get("api/admin/submission_statuses", { 'headers': headers, params: param })
  }
  requestNetworkResource(param: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.get("api/admin/network", { 'headers': headers })
  }
  requestUpdateNetworkResource(param: any): Observable<any> {
    return this.httpClient.put("api/admin/network", param)
  }
  requestTlsConfigResource(): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.get("api/admin/config/tls", { 'headers': headers });
  }
  requestDeleteTlsConfigResource(): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.delete("api/admin/config/tls", { 'headers': headers });
  }
  requestRedirectsResource(param: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.get("api/admin/redirects", { 'headers': headers })
  }
  requestPostRedirectsResource(param: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.post("api/admin/redirects", param, { 'headers': headers })
  }
  requestDeleteRedirectsResource(id: any): Observable<any> {
    return this.httpClient.delete("api/admin/redirects/" + id)
  }
  requestUpdateTlsConfigFilesResource(name: any, data: any): Observable<any> {
    return this.httpClient.put("api/admin/config/tls/files/" + name, data)
  }
  requestDeleteTlsConfigFilesResource(name: string): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.delete("api/admin/config/tls/files/" + name, { 'headers': headers })
  }
  requestAdminAcmeResource(param: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.post("api/admin/config/acme/run", param, { 'headers': headers })
  }
  requestCSRContentResource(name: any, param: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.post("api/admin/config/tls/files/" + name, param, { 'headers': headers })
  }
  downloadCSRFile(): Observable<Blob> {
    const url = "api/admin/config/tls/files/csr";
    return this.httpClient.get(url, { responseType: 'blob' });
  }
  disableTLSConfig(): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const url = "api/admin/config/tls/disable";
    return this.httpClient.post(url, { 'headers': headers });
  }
  enableTLSConfig(): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const url = "api/admin/config/tls/enable";
    return this.httpClient.post(url, { 'headers': headers });
  }

  whistleBlowerTip(param: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.get("api/wbtip", { 'headers': headers, params: param })
  }

  whistleBlowerTipUpdate(param: any, tipid: string): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.post("api/wbtip/" + tipid + "/update", param, { 'headers': headers })
  }

  whistleBlowerIdentityUpdate(param: any, tipid: string): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.post("api/wbtip/" + tipid + "/provideidentityinformation", param, { 'headers': headers })
  }

  requestAdminTenantResource(param: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.get("api/admin/tenants", { 'headers': headers, params: param })
  }
  requestAdminRedirectResource(param: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.get("api/admin/redirects", { 'headers': headers, params: param })
  }
  requestAdminNotificationResource(param: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.get("api/admin/notification", { 'headers': headers, params: param })
  }
  requestAdminNetworkResource(param: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.get("api/admin/network", { 'headers': headers, params: param })
  }

  requestAdminUserResource(param: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.get("api/admin/users", { 'headers': headers, params: param })
  }
  requestAdminFieldTemplateResource(param: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.get("api/admin/fieldtemplates", { 'headers': headers })
  }

  requestAdminContextResource(param: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.get("api/admin/contexts", { 'headers': headers, params: param })
  }

  requestAdminNodeResource(param: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.get("api/admin/node", { 'headers': headers, params: param })
  }
  requestUpdateAdminNodeResource(data: any): Observable<any> {
    // const headers = { 'content-type': 'application/json'}
    return this.httpClient.put("api/admin/node", data)
  }
  requestAdminL10NResource(lang: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.get("api/admin/l10n/" + lang, { 'headers': headers },)
  }
  requestUpdateAdminL10NResource(data: any, lang: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.put("api/admin/l10n/" + lang, data,)
  }
  requestDefaultL10NResource(lang: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.get("/data/l10n/" + lang + ".json", { 'headers': headers },)
  }
  requestAdminAuditLogResource(param: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.get("api/admin/auditlog", { 'headers': headers })
  }
  requestAuditlogResource(param: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.get("api/admin/auditlog", { 'headers': headers })
  }
  requestlogs(url: string): Observable<any> {
    const headers = {
      'content-type': 'application/octet-stream',
      'Accept': 'application/octet-stream',
      'TE': 'trailers' // Add this line to include TE header
    };
    return this.httpClient.get(url, { 'headers': headers })
  }
  requestQuestionareResource(param: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.get("api/admin/questionnaires", { 'headers': headers, params: param })
  }
  addQuestionare(param: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.post(`api/admin/questionnaires`, param, { 'headers': headers })
  }
  requestDeleteAdminQuestionare(id: any): Observable<any> {
    return this.httpClient.delete("api/admin/questionnaires/" + id);
  }
  requestUpdateAdminQuestionare(id: any, param: any): Observable<any> {
    return this.httpClient.put("api/admin/questionnaires/" + id, param);
  }
  requestJobResource(param: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.get("api/admin/auditlog/jobs", { 'headers': headers })
  }

  recieverTipResource(param: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.get("api/rtips", { 'headers': headers })
  }
  recieverTip(param: any, id: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.get("api/rtips/" + id, { 'headers': headers })
  }

  rtipsRequestNewComment(param: any, id: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.post(`api/rtips/${id}/comments`, param, { 'headers': headers })
  }
  retipRequestNewMessage(param: any, id: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.post(`api/rtips/${id}/messages`, param, { 'headers': headers })
  }

  addSubmissionStatus(param: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.post(`api/admin/submission_statuses`, param, { 'headers': headers })
  }

  fetchTenant(): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.get(`api/admin/tenants`, { 'headers': headers })
  }

  addTenant(param: any): Observable<any> {
    return this.httpClient.post("api/admin/tenants", param)
  }

  accessIdentity(id: any): Observable<any> {
    return this.httpClient.post(`api/rtips/${id}/iars`, { "request_motivation": "" });
  }
  requestAddAdminUser(param: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.post("api/admin/users", param, { 'headers': headers })
  }
  requestUpdateAdminUser(id: any, param: any): Observable<any> {
    return this.httpClient.put("api/admin/users/" + id, param);
  }
  requestDeleteAdminUser(id: any): Observable<any> {
    return this.httpClient.delete("api/admin/users/" + id);
  }
  requestAddAdminContext(param: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.post("api/admin/contexts", param, { 'headers': headers })
  }
  requestAddAdminQuestionnaireStep(param: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.post("api/admin/steps", param, { 'headers': headers })
  }
  requestUpdateAdminQuestionnaireStep(id: any, param: any): Observable<any> {
    return this.httpClient.put("api/admin/steps/" + id, param);
  }
  requestDeleteAdminQuestionareStep(id: any): Observable<any> {
    return this.httpClient.delete("api/admin/steps/" + id);
  }
  requestAddAdminQuestionnaireField(param: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.post("api/admin/fields", param, { 'headers': headers })
  }
  requestAddAdminQuestionnaireFieldTemplate(param: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.post("api/admin/fieldtemplates", param, { 'headers': headers })
  }
  requestUpdateAdminQuestionnaireField(id: any, param: any): Observable<any> {
    return this.httpClient.put("api/admin/fields/" + id, param);
  }
  requestDeleteAdminQuestionareField(id: any): Observable<any> {
    return this.httpClient.delete("api/admin/fields/" + id);
  }
  requestUpdateAdminContext(param: any, id: any): Observable<any> {
    return this.httpClient.put("api/admin/contexts/" + id, param);
  }
  requestDeleteAdminContext(id: any): Observable<any> {
    return this.httpClient.delete("api/admin/contexts/" + id);
  }

  requestDeleteStatus(id: string): Observable<any> {
    return this.httpClient.delete("api/admin/submission_statuses/" + id);
  }
  requestUpdateStatus(url: string, param: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.put(url, param, { headers })
  }
  requestUpdateAdminNotification(notification: any): Observable<any> {
    return this.httpClient.put("api/admin/notification", notification);
  }

  runOperation(url: string, operation: string, args: any, refresh: boolean) {

    const data = {
      operation: operation,
      args: args
    };

    if (refresh) {
      setTimeout(() => {
        const currentUrl = this.router.url;
        this.router.navigateByUrl('routing', { skipLocationChange: true, replaceUrl: true }).then(() => {
          this.router.navigate([currentUrl]);
        });
      }, 150);
    }

    return this.httpClient.put(url, data)
  }
  tipOperation = (operation: string, args: any, tipId: any) => {
    const req = {
      "operation": operation,
      "args": args
    };
    return this.httpClient.put("api/rtips/" + tipId, req);
  };
  constructor(private httpClient: HttpClient, private router: Router) {
  }
}
