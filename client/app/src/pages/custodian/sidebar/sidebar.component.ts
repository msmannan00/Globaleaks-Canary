import {Component} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "src-custodian-sidebar",
  templateUrl: "./sidebar.component.html"
})
export class SidebarComponent {
  constructor(private router: Router, private route: ActivatedRoute) {
  }

  isActive(route: string): boolean {
    return this.router.isActive(route, {
      paths: "subset",
      queryParams: "subset",
      fragment: "ignored",
      matrixParams: "ignored"
    });
  }
}
