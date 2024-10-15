import {Component, OnInit} from "@angular/core";
import {networkResolverModel} from "@app/models/resolvers/network-resolver-model";
import {NetworkResolver} from "@app/shared/resolvers/network.resolver";
import {HttpService} from "@app/shared/services/http.service";
import {UtilsService} from "@app/shared/services/utils.service";
import { FormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";
import { TranslatorPipe } from "@app/shared/pipes/translate";

@Component({
    selector: "src-access-control",
    templateUrl: "./access-control.component.html",
    standalone: true,
    imports: [FormsModule, NgIf, TranslatorPipe]
})
export class AccessControlComponent implements OnInit {
  networkData: networkResolverModel;

  constructor(private networkResolver: NetworkResolver, private httpService: HttpService, private utilsService: UtilsService) {
  }

  ngOnInit(): void {
    this.networkData = this.networkResolver.dataModel;
  }

  updateAccessControl(network: networkResolverModel) {
    this.httpService.requestUpdateNetworkResource(network).subscribe(() => {
      this.utilsService.reloadComponent();
    });
  }
}