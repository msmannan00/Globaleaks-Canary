import { Injectable } from '@angular/core';
import {UtilsService} from "./utils.service";
import {TranslationService} from "../../services/translation.service";
import {SubmissionService} from "../../services/submission.service";
import {AuthenticationService} from "../../services/authentication.service";
import {AppConfigService} from "../../services/app-config.service";

@Injectable({
  providedIn: 'root'
})
export class ServiceInstanceService {

  public utilsService: UtilsService;
  public appConfigService: AppConfigService;
  public authenticationService: AuthenticationService;
  public translationService: TranslationService;
  public submissionService: SubmissionService;

  constructor() {

  }

  setUtilsService(instance: UtilsService): void {
    this.utilsService = instance;
  }

  setAppConfigService(instance: AppConfigService): void {
    this.appConfigService = instance;
  }

  setAuthenticationService(instance: AuthenticationService): void {
    this.authenticationService = instance;
  }

  setTranslationService(instance: TranslationService): void {
    this.translationService = instance;
  }

  setSubmissionService(instance: SubmissionService): void {
    this.submissionService = instance;
  }
}
