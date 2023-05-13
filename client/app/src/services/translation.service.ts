import {
  ChangeDetectorRef,
  Injectable,
  Input,
  OnChanges,
  SimpleChanges,
  Renderer2,
  ElementRef,
  RendererFactory2,
} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Observable, Subject } from "rxjs";
import { Router } from "@angular/router";
import { UtilsService } from "../shared/services/utils.service";

@Injectable({
  providedIn: "root",
})
export class TranslationService {
  facts = {
    userChoice: null,
    urlParam: null,
    userPreference: null,
    nodeDefault: null,
  };

  enabledLanguages: Array<any>;

  state = {
    language: "",
    dir: "",
  };

  language: string;
  isSelectable(language: any) {
    if (language === null) {
      return false;
    }

    if (this.enabledLanguages.length) {
      return this.enabledLanguages.indexOf(language) !== -1;
    }

    return true;
  }
  bestLanguage(facts: any) {
    let lang: any = "*";
    if (this.isSelectable(this.facts.userChoice)) {
      lang = facts.userChoice;
    } else if (this.isSelectable(this.facts.urlParam)) {
      lang = facts.urlParam;
    } else if (this.isSelectable(this.facts.userPreference)) {
      lang = facts.userPreference;
    } else if (this.isSelectable(this.facts.nodeDefault)) {
      lang = facts.nodeDefault;
    }

    return lang;
  }
  updateTranslationServices(lang: string) {
    this.state.dir = this.findDirection(lang);
    document
      .getElementsByTagName("html")[0]
      .setAttribute("dir", this.state.dir);
    this.translateService.use(lang);
    this.translateService.setDefaultLang(lang);
  }

  findDirection(lang: string) {
    let useRightToLeft =
      ["ar", "dv", "fa", "fa_AF", "he", "ps", "ug", "ur"].indexOf(lang) !== -1;
    // const direction = useRightToLeft ? "rtl" : "ltr";
    return useRightToLeft ? "rtl" : "ltr";
    // this.loadDirectionalStylesheet(direction);
  }

  determineLanguage() {
    this.language = this.state.language = this.bestLanguage(this.facts);
    if (this.state.language !== "*") {
      this.updateTranslationServices(this.state.language);
      window.document
        .getElementsByTagName("html")[0]
        .setAttribute("lang", this.state.language);
    }
  }
  addNodeFacts(defaultLang: any, languages_enabled: any) {
    this.facts.nodeDefault = defaultLang;

    this.enabledLanguages = languages_enabled;
    this.determineLanguage();

    this.loadDirectionalStylesheet(this.state.dir);
  }
  validLang(inp: string) {
    if (!inp) {
      return false;
    }

    if (this.enabledLanguages.length) {
      return this.enabledLanguages.indexOf(inp) > -1;
    }

    return true;
  }
  setLang(choice: any) {
    if (choice) {
      choice = this.state.language;
    }

    if (this.validLang(choice)) {
      this.facts.userChoice = choice;
      this.determineLanguage();
    }
  }

  onChange() {
    this.state.language = this.language;
    this.setLang(this.language);
    this.utilsService.reloadCurrentRoute();
  }

  changeLanguage(language: string) {
    this.state.language = language;
    this.setLang(this.language);
    this.utilsService.reloadCurrentRoute();
    return this.state;
  }

  loadDirectionalStylesheet(direction: string) {
    this.loadCssFile(this.findDirectionalStyelsheet(direction), "bootstrap");
  }

  findDirectionalStyelsheet(direction: string) {
    return direction === "rtl"
      ? "lib/bootstrap/bootstrap.rtl.css"
      : "lib/bootstrap/bootstrap.css";
  }

  loadCssFile(cssUrl: string, id: string) {
    console.log("1");

    const linkElement = this.renderer.createElement("link");
    this.renderer.setAttribute(linkElement, "rel", "stylesheet");
    this.renderer.setAttribute(linkElement, "type", "text/css");
    this.renderer.setAttribute(linkElement, "id", id);
    this.renderer.setAttribute(linkElement, "href", cssUrl);
    this.renderer.appendChild(document.head, linkElement);
    console.log("2");
  }

  updateCssFile(cssFile: string, elementREf: ElementRef) {
    // console.log("this.renderer =>", this.renderer);
    // console.log("12");
    // this.renderer.setAttribute(elementREf, "href", cssFile);
    // console.log("ss1");
  }

  private renderer: Renderer2;

  constructor(
    public translateService: TranslateService,
    private router: Router,
    public utilsService: UtilsService,
    private rendererFactory: RendererFactory2 // private elementRef: ElementRef
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }
}
