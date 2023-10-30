import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Constants} from "@app/shared/constants/constants";
import {HttpService} from "@app/shared/services/http.service";
import {UtilsService} from "@app/shared/services/utils.service";

@Component({
  selector: "src-https-csr-gen",
  templateUrl: "./https-csr-gen.component.html"
})
export class HttpsCsrGenComponent {
  @Output() dataToParent = new EventEmitter<string>();
  @Input() fileResources: any;
  protected readonly Constants = Constants;
  csr_cfg: {
    country: string;
    province: string;
    city: string;
    company: string;
    department: string;
    email: string;
    } = {
      country: "",
      province: "",
      city: "",
      company: "",
      department: "",
      email: ""
  };

  constructor(private httpService: HttpService, private utilsService:UtilsService) {
  }

  submitCSR() {
    this.httpService.requestCSRDirectContentResource(this.csr_cfg).subscribe(
      (response) => {
        this.utilsService.saveAs(new Blob([response.data], {type: "text/plain;charset=utf-8"}), "csr.pem");
      },
      (error) => {
        if (error.status === 201) {
          const errorText = error.error.text;
          this.utilsService.saveAs(new Blob([errorText], { type: 'application/octet-stream' }), "csr.pem");
        }
      }
    );
  }
}