import {Component, OnInit} from "@angular/core";
import {NodeResolver} from "app/src/shared/resolvers/node.resolver";
import {UtilsService} from "app/src/shared/services/utils.service";

@Component({
  selector: "src-users-tab2",
  templateUrl: "./users-tab2.component.html"
})
export class UsersTab2Component implements OnInit {
  nodeData: any = [];

  constructor(private nodeResolver: NodeResolver, private utilsService: UtilsService) {
  }

  ngOnInit(): void {
    if (this.nodeResolver.dataModel) {
      this.nodeData = this.nodeResolver.dataModel;
    }
  }

  updateNode() {
    this.utilsService.update(this.nodeData).subscribe(_ => {
      this.utilsService.reloadCurrentRoute();
    });
  }
}