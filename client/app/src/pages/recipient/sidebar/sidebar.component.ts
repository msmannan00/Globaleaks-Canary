import {Component} from "@angular/core";
import {PreferenceResolver} from "@app/shared/resolvers/preference.resolver";

@Component({
  selector: "src-receipt-sidebar",
  templateUrl: "./sidebar.component.html"
})
export class SidebarComponent {
  message: string;

  constructor(protected preferenceResolver: PreferenceResolver) {
  }

}
