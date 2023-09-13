import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
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
    return this.httpClient.post("api/tokenauth", param)
  }

  requestGeneralLogin(param: string): Observable<any> {
    return this.httpClient.post("api/auth/authentication", param)
  }

  requestWhistleBlowerLogin(param: string): Observable<any> {
    return this.httpClient.post("api/receiptauth", param)
  }

  requestDeleteSession(): Observable<any> {
    return this.httpClient.delete("api/session")
  }

  requestDeleteTenant(url: any): Observable<any> {
    return this.httpClient.delete(url)
  }

  requestUpdateTenant(url: any, data: any): Observable<any> {
    return this.httpClient.put(url, data)
  }

  deleteDBFile(id: string): Observable<any> {
    return this.httpClient.delete("api/wbfile/" + id)
  }

  requestOperations(data: any, header?: any): Observable<any> {
    return this.httpClient.put("api/user/operations", data, header)
  }

  updatePreferenceResource(data: any): Observable<any> {
    return this.httpClient.put("api/preferences", data)
  }

  requestChangePassword(param: string): Observable<any> {
    return this.httpClient.put<password_recovery_response_model>("api/reset/password", param)
  }

  requestToken(param: string): Observable<any> {
    return this.httpClient.post("api/auth/token", param)
  }

  requestResetLogin(param: string): Observable<any> {
    return this.httpClient.post("api/reset/password", param)
  }

  requestSignup(param: string): Observable<any> {
    return this.httpClient.post("api/signup", param)
  }

  requestWizard(param: string): Observable<any> {
    return this.httpClient.post("api/wizard", param)
  }

  requestSignupToken(token: any): Observable<any> {
    return this.httpClient.get("api/signup/" + token)
  }

  requestTenantSwitch(url: any): Observable<any> {
    return this.httpClient.get(url)
  }

  requestReportSubmission(param: string): Observable<any> {
    return this.httpClient.post("api/submission", param)
  }

  requestSuppor(param: string): Observable<any> {
    return this.httpClient.post("api/support", param)
  }
  requestNewComment(param: string): Observable<any> {
    return this.httpClient.post("api/wbtip/comments", param)
  }

  requestNewMessage(param: string, suburl: string): Observable<any> {
    return this.httpClient.post("api/wbtip/messages/" + suburl, param)
  }

  requestPreferenceResource(): Observable<any> {
    return this.httpClient.get("api/preferences")
  }

  requestNodeResource(): Observable<any> {
    return this.httpClient.get("api/admin/node")
  }

  updateNodeResource(data: any): Observable<any> {
    return this.httpClient.put("api/admin/node", data)
  }

  requestUsersResource(): Observable<any> {
    return this.httpClient.get("api/admin/users")
  }
  requestContextsResource(): Observable<any> {
    return this.httpClient.get("api/admin/contexts")
  }
  requestTenantsResource(): Observable<any> {
    return this.httpClient.get("api/admin/tenants")
  }
  requestQuestionnairesResource(): Observable<any> {
    return this.httpClient.get("api/admin/questionnaires")
  }
  requestTipResource(): Observable<any> {
    return this.httpClient.get("api/admin/auditlog/tips")
  }
  requestNotificationsResource(): Observable<any> {
    return this.httpClient.get("api/admin/notification")
  }

  requestNetworkResource(): Observable<any> {
    return this.httpClient.get("api/admin/network")
  }
  requestUpdateNetworkResource(param: any): Observable<any> {
    return this.httpClient.put("api/admin/network", param)
  }
  requestTlsConfigResource(): Observable<any> {
    return this.httpClient.get("api/admin/config/tls");
  }
  requestDeleteTlsConfigResource(): Observable<any> {
    return this.httpClient.delete("api/admin/config/tls");
  }
  requestRedirectsResource(): Observable<any> {
    return this.httpClient.get("api/admin/redirects")
  }
  requestPostRedirectsResource(param: any): Observable<any> {
    return this.httpClient.post("api/admin/redirects", param)
  }
  requestDeleteRedirectsResource(id: any): Observable<any> {
    return this.httpClient.delete("api/admin/redirects/" + id)
  }
  requestUpdateTlsConfigFilesResource(name: any, data: any): Observable<any> {
    return this.httpClient.put("api/admin/config/tls/files/" + name, data)
  }
  requestDeleteTlsConfigFilesResource(name: string): Observable<any> {
    return this.httpClient.delete("api/admin/config/tls/files/" + name)
  }
  requestAdminAcmeResource(param: any): Observable<any> {
    return this.httpClient.post("api/admin/config/acme/run", param)
  }
  requestCSRContentResource(name: any, param: any): Observable<any> {
    return this.httpClient.post("api/admin/config/tls/files/" + name, param)
  }
  downloadCSRFile(): Observable<Blob> {
    const url = "api/admin/config/tls/files/csr";
    return this.httpClient.get(url, { responseType: 'blob' });
  }
  disableTLSConfig(): Observable<any> {
    const url = "api/admin/config/tls/disable";
    return this.httpClient.post(url, {});
  }
  enableTLSConfig(): Observable<any> {
    const url = "api/admin/config/tls/enable";
    return this.httpClient.post(url, {});
  }

  whistleBlowerTip(): Observable<any> {
    return this.httpClient.get("api/wbtip")
  }

  whistleBlowerTipUpdate(param: any, tipid: string): Observable<any> {
    return this.httpClient.post("api/wbtip/" + tipid + "/update", param)
  }

  whistleBlowerIdentityUpdate(param: any, tipid: string): Observable<any> {
    return this.httpClient.post("api/wbtip/" + tipid + "/provideidentityinformation", param)
  }

  requestAdminFieldTemplateResource(): Observable<any> {
    return this.httpClient.get("api/admin/fieldtemplates")
  }

  requestUpdateAdminNodeResource(data: any): Observable<any> {
    return this.httpClient.put("api/admin/node", data)
  }
  requestAdminL10NResource(lang: any): Observable<any> {
    return this.httpClient.get("api/admin/l10n/" + lang)
  }
  requestUpdateAdminL10NResource(data: any, lang: any): Observable<any> {
    return this.httpClient.put("api/admin/l10n/" + lang, data)
  }
  requestDefaultL10NResource(lang: any): Observable<any> {
    return this.httpClient.get("/data/l10n/" + lang + ".json")
  }
  requestAdminAuditLogResource(): Observable<any> {
    return this.httpClient.get("api/admin/auditlog")
  }

  addQuestionare(param: any): Observable<any> {
    return this.httpClient.post(`api/admin/questionnaires`, param)
  }
  requestDeleteAdminQuestionare(id: any): Observable<any> {
    return this.httpClient.delete("api/admin/questionnaires/" + id);
  }
  requestUpdateAdminQuestionare(id: any, param: any): Observable<any> {
    return this.httpClient.put("api/admin/questionnaires/" + id, param);
  }
  requestJobResource(): Observable<any> {
    return this.httpClient.get("api/admin/auditlog/jobs")
  }

  recieverTipResource(): Observable<any> {
    return this.httpClient.get("api/rtips")
  }
  recieverTip(id: any): Observable<any> {
    return this.httpClient.get("api/rtips/" + id)
  }

  rtipsRequestNewComment(param: any, id: any): Observable<any> {
    return this.httpClient.post(`api/rtips/${id}/comments`, param)
  }
  retipRequestNewMessage(param: any, id: any): Observable<any> {
    return this.httpClient.post(`api/rtips/${id}/messages`, param)
  }

  addSubmissionStatus(param: any): Observable<any> {
    return this.httpClient.post(`api/admin/submission_statuses`, param)
  }

  fetchTenant(): Observable<any> {
    return this.httpClient.get(`api/admin/tenants`)
  }

  addTenant(param: any): Observable<any> {
    return this.httpClient.post("api/admin/tenants", param)
  }

  accessIdentity(id: any): Observable<any> {
    return this.httpClient.post(`api/rtips/${id}/iars`, { "request_motivation": "" });
  }
  requestAddAdminUser(param: any): Observable<any> {
    return this.httpClient.post("api/admin/users", param)
  }
  requestUpdateAdminUser(id: any, param: any): Observable<any> {
    return this.httpClient.put("api/admin/users/" + id, param);
  }
  requestDeleteAdminUser(id: any): Observable<any> {
    return this.httpClient.delete("api/admin/users/" + id);
  }
  requestAddAdminContext(param: any): Observable<any> {
    return this.httpClient.post("api/admin/contexts", param)
  }
  requestAddAdminQuestionnaireStep(param: any): Observable<any> {
    return this.httpClient.post("api/admin/steps", param)
  }
  requestUpdateAdminQuestionnaireStep(id: any, param: any): Observable<any> {
    return this.httpClient.put("api/admin/steps/" + id, param);
  }
  requestDeleteAdminQuestionareStep(id: any): Observable<any> {
    return this.httpClient.delete("api/admin/steps/" + id);
  }
  requestAddAdminQuestionnaireField(param: any): Observable<any> {
    return this.httpClient.post("api/admin/fields", param)
  }
  requestAddAdminQuestionnaireFieldTemplate(param: any): Observable<any> {
    return this.httpClient.post("api/admin/fieldtemplates", param)
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
