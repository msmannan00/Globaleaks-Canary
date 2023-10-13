import {ChangeDetectionStrategy, Component} from "@angular/core";
import {NodeResolver} from "app/src/shared/resolvers/node.resolver";

@Component({
  selector: "src-admin-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {

  constructor(public nodeResolver: NodeResolver) {
  }

}