import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import { Observable } from 'rxjs';
import {password_recovery_response_model} from "../../models/authentication/password_recovery_response_model";


@Injectable({
  providedIn: 'root'
})
export class HttpService{

  getPublicResource(): Observable<any>{
    return this.httpClient.get<any>("/api/public", {observe: 'response'});
  }

  requestAuthTokenLogin(param: string): Observable<any>{
    const headers = { 'content-type': 'application/json'}
    return this.httpClient.post("api/tokenauth", param,{'headers':headers })
  }

  requestGeneralLogin(param: string): Observable<any>{
    const headers = { 'content-type': 'application/json'}
    return this.httpClient.post("api/authentication", param,{'headers':headers })
  }

  requestWhistleBlowerLogin(param: string): Observable<any>{
    const headers = { 'content-type': 'application/json'}
    return this.httpClient.post("api/receiptauth", param,{'headers':headers })
  }

  requestDeleteSession(): Observable<any>{
    const headers = { 'content-type': 'application/json'}
    return this.httpClient.delete("api/session",{'headers':headers })
  }

  requestOperations(data:any): Observable<any>{
    const headers = { 'content-type': 'application/json'}
    return this.httpClient.put("api/user/operations",data)
  }

  requestChangePassword(param: string): Observable<any>{
    const headers = { 'content-type': 'application/json'}
    return this.httpClient.put<password_recovery_response_model>("api/reset/password", param,{'headers':headers })
  }

  requestResetLogin(param: string): Observable<any>{
    const headers = { 'content-type': 'application/json'}
    return this.httpClient.post("api/reset/password", param,{'headers':headers })
  }
  requestReportSubmission(param: string): Observable<any>{
    const headers = { 'content-type': 'application/json'}
    return this.httpClient.post("api/submission", param,{'headers':headers })
  }

  requestSuppor(param: string): Observable<any>{
    const headers = { 'content-type': 'application/json'}
    return this.httpClient.post("api/support", param,{'headers':headers })
  }
  requestNewComment(param: string): Observable<any>{
    const headers = { 'content-type': 'application/json'}
    return this.httpClient.post("api/wbtip/comments", param,{'headers':headers })
  }

  requestNewMessage(param: string, suburl:string): Observable<any>{
    const headers = { 'content-type': 'application/json'}
    return this.httpClient.post("api/wbtip/messages/"+suburl, param,{'headers':headers })
  }

  requestPreferenceResource(param: any): Observable<any>{
    const headers = { 'content-type': 'application/json'}
    return this.httpClient.get("api/preferences", {'headers':headers })
  }

  requestTipResource(param: any): Observable<any>{
    const headers = { 'content-type': 'application/json'}
    return this.httpClient.get("api/admin/auditlog/tips", {'headers':headers })
  }
  requestSubmissionStatusResource(param: any): Observable<any>{
    const headers = { 'content-type': 'application/json'}
    return this.httpClient.get("api/admin/submission_statuses", {'headers':headers, params: param })
  }

  whistleBlowerTip(param: any): Observable<any>{
    const headers = { 'content-type': 'application/json'}
    return this.httpClient.get("api/wbtip", {'headers':headers, params: param })
  }

  whistleBlowerTipUpdate(param: any, tipid:string): Observable<any>{
    const headers = { 'content-type': 'application/json'}
    return this.httpClient.post("api/wbtip/"+tipid+"/update", param,{'headers':headers })
  }

  whistleBlowerIdentityUpdate(param: any, tipid:string): Observable<any>{
    const headers = { 'content-type': 'application/json'}
    return this.httpClient.post("api/wbtip/"+tipid+"/provideidentityinformation", param,{'headers':headers })
  }

  requestAdminTenantResource(param: any): Observable<any>{
    const headers = { 'content-type': 'application/json'}
    return this.httpClient.get("api/admin/tenants", {'headers':headers, params: param })
  }
  requestAdminRedirectResource(param: any): Observable<any>{
    const headers = { 'content-type': 'application/json'}
    return this.httpClient.get("api/admin/redirects", {'headers':headers, params: param })
  }
  requestAdminNotificationResource(param: any): Observable<any>{
    const headers = { 'content-type': 'application/json'}
    return this.httpClient.get("api/admin/notification", {'headers':headers, params: param })
  }
  requestAdminNetworkResource(param: any): Observable<any>{
    const headers = { 'content-type': 'application/json'}
    return this.httpClient.get("api/admin/network", {'headers':headers, params: param })
  }

  requestAdminUserResource(param: any): Observable<any>{
    const headers = { 'content-type': 'application/json'}
    return this.httpClient.get("api/admin/users", {'headers':headers, params: param })
  }
  requestAdminFieldTemplateResource(param: any): Observable<any>{
    const headers = { 'content-type': 'application/json'}
    return this.httpClient.get("api/admin/fieldtemplates", {'headers':headers, params: param })
  }

  requestAdminContextResource(param: any): Observable<any>{
    const headers = { 'content-type': 'application/json'}
    return this.httpClient.get("api/admin/contexts", {'headers':headers, params: param })
  }

  requestAdminNodeResource(param: any): Observable<any>{
    const headers = { 'content-type': 'application/json'}
    return this.httpClient.get("api/admin/node", {'headers':headers, params: param })
  }

  requestAdminAuditLogResource(param: any): Observable<any>{
    const headers = { 'content-type': 'application/json'}
    return this.httpClient.get("api/admin/auditlog", {'headers':headers, params: param })
  }
  requestQuestionareResource(param: any): Observable<any>{
    const headers = { 'content-type': 'application/json'}
    return this.httpClient.get("api/admin/questionnaires", {'headers':headers, params: param })
  }

  requestJobResource(param: any): Observable<any>{
    const headers = { 'content-type': 'application/json'}
    return this.httpClient.get("api/admin/auditlog/jobs", {'headers':headers })
  }

  recieverTipResource(param: any): Observable<any>{
    const headers = { 'content-type': 'application/json'}
    return this.httpClient.get("api/rtips", {'headers':headers })
  }

  constructor(private httpClient: HttpClient) {
  }
}
