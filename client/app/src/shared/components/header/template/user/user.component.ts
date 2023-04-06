import { Component } from '@angular/core';
import {AuthenticationService} from "../../../../../services/authentication.service";
import {PreferenceResolver} from "../../../../resolvers/preference.resolver";
import {AppConfigService} from "../../../../../services/app-config.service";
import {UtilsService} from "../../../../services/utils.service";
import {AppDataService} from "../../../../../app-data.service";
import {GLTranslationService} from "../../../../../services/gltranslation.service";

@Component({
  selector: 'views-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  constructor(public authentication: AuthenticationService, public preferences:PreferenceResolver, public appConfig: AppConfigService, public utils: UtilsService, public appDataService:AppDataService, public glTranslationService:GLTranslationService) {
    //alert(JSON.stringify(appDataService.languages_enabled_selector))
  }

  protected readonly GLTranslationService = GLTranslationService;
}
