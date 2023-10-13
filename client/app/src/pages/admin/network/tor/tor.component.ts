import {Component, OnInit} from "@angular/core";
import {NetworkResolver} from "app/src/shared/resolvers/network.resolver";
import {NodeResolver} from "app/src/shared/resolvers/node.resolver";
import {HttpService} from "app/src/shared/services/http.service";
import {UtilsService} from "app/src/shared/services/utils.service";

@Component({
  selector: "src-tor",
  templateUrl: "./tor.component.html"
})
export class TorComponent implements OnInit {
  torOnionResetInProgress: boolean = false;
  networkData: any;

  constructor(public nodeResolver: NodeResolver, private networkResolver: NetworkResolver, private httpService: HttpService, private utilsService: UtilsService) {
  }

  ngOnInit(): void {
    this.networkData = this.networkResolver.dataModel;
  }

  resetOnionPrivateKey() {
    return this.utilsService.runAdminOperation("reset_onion_private_key", {}, true);
  }

  updateTor(network: any) {
    this.httpService.requestUpdateNetworkResource(network).subscribe(() => {
      this.utilsService.reloadCurrentRoute();
    });
  }
}