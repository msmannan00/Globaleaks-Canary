import {Component} from "@angular/core";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { TranslatorPipe } from "@app/shared/pipes/translate";

@Component({
    selector: "src-custodian-sidebar",
    templateUrl: "./sidebar.component.html",
    standalone: true,
    imports: [RouterLink, RouterLinkActive, TranslateModule, TranslatorPipe]
})
export class CustodianSidebarComponent {
  constructor(private router: Router) {
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
