import {Component} from "@angular/core";
import {AppDataService} from "@app/app-data.service";
import {UtilsService} from "@app/shared/services/utils.service";
import { NgIf } from "@angular/common";
import { MarkdownComponent } from "ngx-markdown";
import { TranslateModule } from "@ngx-translate/core";
import { TranslatorPipe } from "@app/shared/pipes/translate";
import { StripHtmlPipe } from "@app/shared/pipes/strip-html.pipe";

@Component({
    selector: "src-privacybadge",
    templateUrl: "./privacy-badge.component.html",
    standalone: true,
    imports: [NgIf, MarkdownComponent, TranslateModule, TranslatorPipe, StripHtmlPipe]
})
export class PrivacyBadgeComponent {
  public markdown: string;

  constructor(protected appDataService: AppDataService, protected utilsService: UtilsService) {
    this.markdown = appDataService.public.node.custom_privacy_badge_text;
  }

}
