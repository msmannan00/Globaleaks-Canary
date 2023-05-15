import {Injectable} from '@angular/core';
import {HttpService} from "../shared/services/http.service";
import {TranslateService} from "@ngx-translate/core";
import {UtilsService} from "../shared/services/utils.service";
import {AppDataService} from "../app-data.service";
import {FieldUtilitiesService} from "../shared/services/field-utilities.service";
import {TranslationService} from "./translation.service";
import {Route, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AppConfigService{

  initTranslation(){
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
  }

  public setHomepage() {
    location.replace("/");
  };

  public setPage(page:string){
    this.rootDataService.page = page
  }

  private localInitialization(){

    this.appServices.getPublicResource().subscribe({
      next: data => {
        this.rootDataService.public = data.body;

        //this.translateService.setDefaultLang(this.rootDataService.public.node.default_language);
        //this.translateService.use(this.rootDataService.public.node.default_language);
        //this.utilsService.routeCheck()

        let elem
        if (window.location.pathname === "/") {
          if (this.rootDataService.public.node.css) {
            elem = document.getElementById("load-custom-css");
            if (elem === null) {
              elem = document.createElement("link");
              elem.setAttribute("id", "load-custom-css");
              elem.setAttribute("rel", "stylesheet");
              elem.setAttribute("type", "text/css");
              elem.setAttribute("href", "s/css");
              document.getElementsByTagName("head")[0].appendChild(elem);
            }
          }

          if (this.rootDataService.public.node.script) {
            elem = document.getElementById("load-custom-script");
            if (elem === null) {
              elem = document.createElement("script");
              elem.setAttribute("id", "load-custom-script");
              elem.setAttribute("src", "script");
              document.getElementsByTagName("body")[0].appendChild(elem);
            }
          }

          if (this.rootDataService.public.node.favicon) {
            const element = window.document.getElementById("favicon");
            if (element !== null) {
              element.setAttribute("href", "s/favicon");
            }
          }
        }

        this.rootDataService.contexts_by_id = this.utilsService.array_to_map(this.rootDataService.public.contexts);
        this.rootDataService.receivers_by_id = this.utilsService.array_to_map(this.rootDataService.public.receivers);
        this.rootDataService.questionnaires_by_id = this.utilsService.array_to_map(this.rootDataService.public.questionnaires);


        this.rootDataService.submission_statuses = this.rootDataService.public.submission_statuses;
        this.rootDataService.submission_statuses_by_id = this.utilsService.array_to_map(this.rootDataService.public.submission_statuses);


        for (let [key, element] of Object.entries(this.rootDataService.questionnaires_by_id)) {
          this.fieldUtilitiesService.parseQuestionnaire(this.rootDataService.questionnaires_by_id[key], {})
          this.rootDataService.questionnaires_by_id[key].steps = this.rootDataService.questionnaires_by_id[key].steps.sort((a:any,b:any)=>a.order > b.order)
        }

        for (let [key, element] of Object.entries(this.rootDataService.contexts_by_id)) {
          this.rootDataService.contexts_by_id[key].questionnaire = this.rootDataService.questionnaires_by_id[this.rootDataService.contexts_by_id[key].questionnaire_id];
          if (this.rootDataService.contexts_by_id[key].additional_questionnaire_id) {
            this.rootDataService.contexts_by_id[key].additional_questionnaire = this.rootDataService.questionnaires_by_id[this.rootDataService.contexts_by_id[key].additional_questionnaire_id];
          }
        }

        this.rootDataService.connection = {
          "tor": data.headers["X-Check-Tor"] === "true" || location.host.match(/\.onion$/),
        };

        this.rootDataService.privacy_badge_open = !this.rootDataService.connection.tor;

        this.utilsService.routeCheck();

        this.rootDataService.languages_enabled = new Map<number, string>();
        this.rootDataService.languages_enabled_selector = [];
        this.rootDataService.languages_supported = new Map<number, string>();

        let self = this
        this.rootDataService.public.node.languages_supported.forEach(function(lang:any){
          self.rootDataService.languages_supported.set(lang.code, lang)

          if (self.rootDataService.public.node.languages_enabled.includes(lang.code)) {
            self.rootDataService.languages_enabled.set(lang.code, lang)
            self.rootDataService.languages_enabled_selector.push(lang);
          }
        });

        this.glTranslationService.onChange(this.rootDataService.public.node.default_language)
        this.utilsService.setTitle()
        this.rootDataService.started = true;
      }
    });
    this.router.events.subscribe(() => {
      if(this.router.url!=="/" && this.router.url!=="/routing"){
        this.rootDataService.page = ""
      }
    });
  }

  constructor(private router: Router, public appServices: HttpService, public translateService: TranslateService, public utilsService:UtilsService, public rootDataService:AppDataService, public fieldUtilitiesService:FieldUtilitiesService, private glTranslationService:TranslationService) {
    this.localInitialization();
  }
}
