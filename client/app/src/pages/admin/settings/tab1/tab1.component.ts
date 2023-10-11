import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NodeResolver } from 'app/src/shared/resolvers/node.resolver';
import { UtilsService } from 'app/src/shared/services/utils.service';
import {AuthenticationService} from "../../../../services/authentication.service";
import {AppConfigService} from "../../../../services/app-config.service";

@Component({
  selector: 'src-tab1',
  templateUrl: './tab1.component.html',
  styleUrls: ['./tab1.component.css']
})
export class Tab1Component {
  // @Input() node: NodeResolver;
  @Input() contentForm: NgForm;
  constructor(public appConfigService:AppConfigService, public node:NodeResolver, public authenticationService:AuthenticationService,public utilsService: UtilsService) { }

  ngOnInit(): void {}
  updateNode() {
    this.utilsService.update(this.node.dataModel).subscribe(res=>{
      this.appConfigService.reinit(false)
      this.utilsService.reloadCurrentRoute();
    })
  }
}
