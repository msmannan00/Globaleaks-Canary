import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { AppDataService } from "../app-data.service";
import { PreferenceResolver } from "../shared/resolvers/preference.resolver";
import {UtilsService} from "../shared/services/utils.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AppConfigService} from "./app-config.service";
import {ServiceInstanceService} from "../shared/services/service-instance.service";

@Injectable({
  providedIn: "root",
})
export class TranslationService {

  language = "";

  public utilsService:UtilsService
  public appConfigService: AppConfigService

  constructor(
    private serviceInstanceService:ServiceInstanceService,
    public preferenceResolver: PreferenceResolver,
    public translateService: TranslateService,
    public appDataService: AppDataService,
    private router: Router,
  ) {
  }

  init(){
    this.utilsService = this.serviceInstanceService.utilsService
    this.appConfigService = this.serviceInstanceService.appConfigService
  }

  onChange(changedLanguage: string) {
    this.language = changedLanguage;
    this.translateService.use(this.language).subscribe(() => {
      this.translateService.getTranslation(this.language).subscribe();
    });
  }
}
