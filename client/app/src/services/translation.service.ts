import {
  Injectable,
} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { UtilsService } from "../shared/services/utils.service";

@Injectable({
  providedIn: "root",
})
export class TranslationService {

  language=""
  onInit(changedLanguage:string) {
    this.language = changedLanguage
    this.translateService.setDefaultLang(this.language);
  }

  onChange(changedLanguage:string) {
    this.language = changedLanguage
    this.translateService.use(this.language);
    this.translateService.use(this.language).subscribe(() => {
      this.translateService.getTranslation(this.language).subscribe(() => {
        this.utilsService.reloadCurrentRoute()
      });
    });
  }

  constructor(
      public translateService: TranslateService,
      public utilsService: UtilsService,
  ) {

  }
}
