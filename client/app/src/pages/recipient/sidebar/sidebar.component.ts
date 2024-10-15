import {Component} from "@angular/core";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import {PreferenceResolver} from "@app/shared/resolvers/preference.resolver";
import { NgClass, NgIf } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { TranslatorPipe } from "@app/shared/pipes/translate";

@Component({
    selector: "src-receipt-sidebar",
    templateUrl: "./sidebar.component.html",
    standalone: true,
    imports: [RouterLink, RouterLinkActive, NgClass, NgIf, TranslateModule, TranslatorPipe]
})
export class ReceiptSidebarComponent {
  message: string;

  constructor(private router: Router, protected preferenceResolver: PreferenceResolver) {
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
