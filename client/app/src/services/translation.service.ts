import {
  Injectable,
} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { UtilsService } from "../shared/services/utils.service";
import {AppConfigService} from "./app-config.service";
import {AppDataService} from "../app-data.service";
import {PreferenceResolver} from "../shared/resolvers/preference.resolver";

@Injectable({
  providedIn: "root",
})
export class TranslationService {

  language=""
  onInit(changedLanguage:string) {
    this.language = changedLanguage
    if(this.preferenceResolver.dataModel){
      this.translateService.setDefaultLang(this.preferenceResolver.dataModel.language);
    }else {
      this.translateService.setDefaultLang(this.language);
    }
  }

  onChange(changedLanguage:string) {
    this.language = changedLanguage
    let page = this.appDataService.page

    this.translateService.use(this.language).subscribe(() => {
      this.translateService.getTranslation(this.language).subscribe(() => {
        //this.utilsService.reloadCurrentRoute();
      });
    });
  }

  constructor(
      public preferenceResolver: PreferenceResolver,
      public translateService: TranslateService,
      public appDataService:AppDataService,
      public utilsService: UtilsService,
  ) {

  }
}
