import {Component} from "@angular/core";
import {QuestionnairesResolver} from "@app/shared/resolvers/questionnaires.resolver";
import {UtilsService} from "@app/shared/services/utils.service";
import {NodeResolver} from "@app/shared/resolvers/node.resolver";
import { FormsModule } from "@angular/forms";
import { NgFor, NgIf } from "@angular/common";
import { TranslatorPipe } from "@app/shared/pipes/translate";
import { TranslateModule } from "@ngx-translate/core";

@Component({
    selector: "src-sites-tab2",
    templateUrl: "./sites-tab2.component.html",
    standalone: true,
    imports: [FormsModule, NgFor, NgIf, TranslatorPipe, TranslateModule]
})
export class SitesTab2Component {

  constructor(protected nodeResolver: NodeResolver, protected utilsService: UtilsService, public questionnairesResolver: QuestionnairesResolver) {
  }
}