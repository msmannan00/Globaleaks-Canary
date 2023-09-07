import { Component, OnInit } from '@angular/core';
import { NetworkResolver } from 'app/src/shared/resolvers/network.resolver';
import { NodeResolver } from 'app/src/shared/resolvers/node.resolver';
import { HttpService } from 'app/src/shared/services/http.service';
import { UtilsService } from 'app/src/shared/services/utils.service';

@Component({
  selector: 'src-tor',
  templateUrl: './tor.component.html',
  styleUrls: ['./tor.component.css']
})
export class TorComponent implements OnInit {
  torOnionResetInProgress: boolean = false
  networkData: any
  constructor(public node: NodeResolver, public network: NetworkResolver, public httpService: HttpService, public utilsService: UtilsService) { }
  ngOnInit(): void {
    this.networkData = this.network.dataModel
  }
  resetOnionPrivateKey() {
    return this.utilsService.runAdminOperation("reset_onion_private_key", {}, true);
   }
  updateTor(network: any) {
    this.httpService.requestUpdateNetworkResource(network).subscribe(() => {
      this.utilsService.reloadCurrentRoute()
    })
  }
}
