import {Component, EventEmitter, Output} from "@angular/core";
import {HttpService} from "app/src/shared/services/http.service";

@Component({
  selector: "src-https-setup",
  templateUrl: "./https-setup.component.html"
})
export class HttpsSetupComponent {
  @Output() dataToParent = new EventEmitter<string>();
  fileResources: {
    key: {},
    cert: {},
    chain: {},
    csr: {},
  };

  constructor(private httpService: HttpService) {
    this.fileResources = {
      key: {name: "key"},
      cert: {name: "cert"},
      chain: {name: "chain"},
      csr: {name: "csr"},
    };
  }

  setupAcme() {
    this.httpService.requestUpdateTlsConfigFilesResource("key", this.fileResources.key).subscribe(() => {
      this.httpService.requestAdminAcmeResource({}).subscribe(() => {
        this.dataToParent.emit();
      });
    });
  }

  setup() {
    this.dataToParent.emit("files");
  }
}