import {Injectable} from '@angular/core';
import {HttpService} from "../shared/services/http.service";
import {TranslateService} from "@ngx-translate/core";
import {UtilsService} from "../shared/services/utils.service";
import {AppDataService} from "../app-data.service";
import {FieldUtilitiesService} from "../shared/services/field-utilities.service";
import {TranslationService} from "./translation.service";
import {Router,NavigationEnd, ActivatedRoute} from "@angular/router";
import {PreferenceResolver} from "../shared/resolvers/preference.resolver";
import {Title} from "@angular/platform-browser";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AppConfigService{
  public sidebar: string= '';
  public header_title: string= '';

  constructor(private appConfigService: AppConfigService, private preferenceResolver:PreferenceResolver, private router: Router, private activatedRoute: ActivatedRoute, public appServices: HttpService, public translateService: TranslateService, public utilsService:UtilsService, public authenticationService:AuthenticationService, public appDataService:AppDataService, public fieldUtilitiesService:FieldUtilitiesService, private glTranslationService:TranslationService)  {
    this.localInitialization()
  }

  initTranslation(){
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
  }

  public setHomepage() {
    location.replace("/");
  };

  public setPage(page:string){
    this.appDataService.page = page
  }

  public localInitialization(callback?: () => void){

    this.appServices.getPublicResource().subscribe({
      next: data => {
        this.appDataService.public = data.body;
        let elem
        if (window.location.pathname === "/") {
          if (this.appDataService.public.node.css) {
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

          if (this.appDataService.public.node.script) {
            elem = document.getElementById("load-custom-script");
            if (elem === null) {
              elem = document.createElement("script");
              elem.setAttribute("id", "load-custom-script");
              elem.setAttribute("src", "script");
              document.getElementsByTagName("body")[0].appendChild(elem);
            }
          }

          if (this.appDataService.public.node.favicon) {
            const element = window.document.getElementById("favicon");
            if (element !== null) {
              element.setAttribute("href", "s/favicon");
            }
          }
        }

        this.appDataService.contexts_by_id = this.utilsService.array_to_map(this.appDataService.public.contexts);
        this.appDataService.receivers_by_id = this.utilsService.array_to_map(this.appDataService.public.receivers);
        this.appDataService.questionnaires_by_id = this.utilsService.array_to_map(this.appDataService.public.questionnaires);
        this.appDataService.submission_statuses = this.appDataService.public.submission_statuses;
        this.appDataService.submission_statuses_by_id = this.utilsService.array_to_map(this.appDataService.public.submission_statuses);

        for (let [key] of Object.entries(this.appDataService.questionnaires_by_id)) {
          this.fieldUtilitiesService.parseQuestionnaire(this.appDataService.questionnaires_by_id[key], {})
          this.appDataService.questionnaires_by_id[key].steps = this.appDataService.questionnaires_by_id[key].steps.sort((a:any, b:any)=>a.order > b.order)
        }

        for (let [key] of Object.entries(this.appDataService.contexts_by_id)) {
          this.appDataService.contexts_by_id[key].questionnaire = this.appDataService.questionnaires_by_id[this.appDataService.contexts_by_id[key].questionnaire_id];
          if (this.appDataService.contexts_by_id[key].additional_questionnaire_id) {
            this.appDataService.contexts_by_id[key].additional_questionnaire = this.appDataService.questionnaires_by_id[this.appDataService.contexts_by_id[key].additional_questionnaire_id];
          }
        }

        this.appDataService.connection = {
          "tor": data.headers["X-Check-Tor"] === "true" || location.host.match(/\.onion$/),
        };

        this.appDataService.privacy_badge_open = !this.appDataService.connection.tor;
        this.utilsService.routeCheck();
        this.appDataService.languages_enabled = new Map<number, string>();
        this.appDataService.languages_enabled_selector = [];
        this.appDataService.languages_supported = new Map<number, string>();

        let self = this
        this.appDataService.public.node.languages_supported.forEach(function(lang:any){
          self.appDataService.languages_supported.set(lang.code, lang)

          if (self.appDataService.public.node.languages_enabled.includes(lang.code)) {
            self.appDataService.languages_enabled.set(lang.code, lang)
            self.appDataService.languages_enabled_selector.push(lang);
          }
        });

        if(this.preferenceResolver.dataModel && this.preferenceResolver.dataModel.language){
          setTimeout(() => {
            this.glTranslationService.onChange(this.preferenceResolver.dataModel.language)
          }, 250);
        }else {
          this.glTranslationService.onChange(this.appDataService.public.node.default_language)
        }

        this.appDataService.started = true;
        this.onValidateInitialConfiguration();
        if(callback){
          callback()
        }
      }
    });
  }
  setTitle() {
    const { public: rootData } = this.appDataService;

    if (!rootData || !rootData.node) {
      return;
    }

    let projectTitle = rootData.node.name;
    let pageTitle = rootData.node.header_title_homepage;

    if (location.pathname.substring(1) !== "/") {
      pageTitle = this.header_title;
    } else if (this.appDataService.page === "receiptpage") {
      pageTitle = "Your report was successful.";
    }

    if (pageTitle && pageTitle.length > 0) {
      pageTitle = this.translateService.instant(pageTitle);
    }

    this.appDataService.projectTitle = projectTitle !== "GLOBALEAKS" ? projectTitle : "";
    this.appDataService.pageTitle = pageTitle !== projectTitle ? pageTitle : "";

    if(pageTitle){
      const finalPageTitle = pageTitle.length > 0 ? this.translateService.instant(pageTitle) : projectTitle;
      window.document.title = `${projectTitle} - ${finalPageTitle}`;

      const element = window.document.querySelector('meta[name="description"]');
      if (element instanceof HTMLMetaElement) {
        element.content = rootData.node.description;
      }
    }
  }
  onValidateInitialConfiguration(){
    if(this.appDataService.public.node){
      if (!this.appDataService.public.node.wizard_done) {
        location.replace("/#/wizard");
      }
      else if(this.router.url == "/" && this.appDataService.page == "signuppage"){
        location.replace("/#/signup")
      }
      else if ((this.router.url === "/" || this.router.url === "/submission") && this.appDataService.public.node.adminonly && !this.authenticationService.session) {
        location.replace("/#/admin/home")
      }
    }
  }

  loadAdminRoute(newPath: string) {
    this.appDataService.public.node.wizard_done = true
    this.appDataService.public.node.languages_enabled = []
    this.appDataService.public.node.name = "Globaleaks"

    this.router.navigateByUrl(newPath).then(() => {
      this.appConfigService.sidebar='admin-sidebar'
      this.setTitle()
    });
  }

  routeChangeListener() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.onValidateInitialConfiguration();
          const currentRoute = this.activatedRoute.firstChild?.snapshot;
          if (currentRoute?.data) {
            this.header_title = currentRoute.data['pageTitle'];
            this.sidebar = currentRoute.data['sidebar'];
          }
          this.setTitle()
        });
      }
    });
  }

  reinit(){
    this.localInitialization()
  }
}
