import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ServiceInstanceService} from "@app/shared/services/service-instance.service";

@Injectable({
  providedIn: "root"
})
export class TokenResource {

  private baseUrl = "api/token/:id";

  constructor(private http: HttpClient, private serviceInstanceService: ServiceInstanceService) {
  }

  getToken(id: string) {
    this.http.post<any>(this.baseUrl.replace(":id", id), {}).subscribe();
  }

  async getWithProofOfWork(): Promise<any> {
    const response: any = await this.http.post("api/auth/token", {}).toPromise();
    const token = response;
    token.answer = await this.serviceInstanceService.cryptoService.proofOfWork(token.id);
    return token;
  }
}