import { Component, ElementRef, Renderer2, ViewChild } from "@angular/core";
import { AuthenticationService } from "../../../../../services/authentication.service";
import { PreferenceResolver } from "../../../../resolvers/preference.resolver";
import { AppConfigService } from "../../../../../services/app-config.service";
import { UtilsService } from "../../../../services/utils.service";
import { AppDataService } from "../../../../../app-data.service";
import { TranslationService } from "../../../../../services/translation.service";

@Component({
  selector: "views-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent {
  language: string;

  constructor(
    public authentication: AuthenticationService,
    public preferences: PreferenceResolver,
    public appConfig: AppConfigService,
    public utils: UtilsService,
    public appDataService: AppDataService,
    public translationService: TranslationService,
    // private elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    this.language = translationService.language;
  }

  handleLanguageChange(): void {
    const langugae = this.translationService.changeLanguage(this.language);

    this.renderer.setAttribute(
      document.querySelector("#bootstrap"), //need to update this
      "href",
      this.translationService.findDirectionalStyelsheet(langugae.dir)
    );
  }
}
