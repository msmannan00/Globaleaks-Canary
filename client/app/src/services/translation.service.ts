import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { AppDataService } from "../app-data.service";
import { PreferenceResolver } from "../shared/resolvers/preference.resolver";
import {UtilsService} from "../shared/services/utils.service";

@Injectable({
  providedIn: "root",
})
export class TranslationService {

  language = "";

  constructor(
    public preferenceResolver: PreferenceResolver,
    public translateService: TranslateService,
    public appDataService: AppDataService,
    public utilsService:UtilsService
  ) {
    this.onInit(this.language);
  }

  onInit(changedLanguage: string) {
    this.language = changedLanguage;
    const selectedLanguage = this.preferenceResolver.dataModel?.language || this.language;
    this.translateService.setDefaultLang(selectedLanguage);
  }

  onChange(changedLanguage: string) {
    this.language = changedLanguage;
    this.translateService.use(this.language).subscribe(() => {
      this.translateService.getTranslation(this.language).subscribe();
      this.utilsService.reloadCurrentRoute()
    });
  }
}
