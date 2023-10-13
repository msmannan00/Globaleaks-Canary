import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {NetworkRoutingModule} from "./network-routing.module";
import {NetworkComponent} from "./network.component";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {NgbNavModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgSelectModule} from "@ng-select/ng-select";
import {SharedModule} from "app/src/shared.module";
import {HttpsComponent} from "./https/https.component";
import {TorComponent} from "./tor/tor.component";
import {AccessControlComponent} from "./access-control/access-control.component";
import {UrlRedirectsComponent} from "./url-redirects/url-redirects.component";
import {HttpsSetupComponent} from "./https-setup/https-setup.component";
import {HttpsFilesComponent} from "./https-files/https-files.component";
import {HttpsStatusComponent} from "./https-status/https-status.component";
import {HttpsCsrGenComponent} from "./https-csr-gen/https-csr-gen.component";


@NgModule({
  declarations: [
    NetworkComponent,
    HttpsComponent,
    TorComponent,
    AccessControlComponent,
    UrlRedirectsComponent,
    HttpsSetupComponent,
    HttpsFilesComponent,
    HttpsStatusComponent,
    HttpsCsrGenComponent
  ],
  imports: [
    CommonModule,
    NetworkRoutingModule, SharedModule, NgbNavModule, NgbModule, RouterModule, FormsModule, NgSelectModule,
  ]
})
export class NetworkModule {
}