import {ChangeDetectorRef, Injectable, Input, OnChanges, SimpleChanges} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Observable, Subject} from "rxjs";
import {Router} from "@angular/router";
import {UtilsService} from "../shared/services/utils.service";

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  facts = {
    userChoice: null,
    urlParam: null,
    userPreference: null,
    nodeDefault: null
  };

  enabledLanguages:Array<any>;

  state = {
    language: ""
  };

  language:string
  isSelectable(language:any){
    if (language === null) {
      return false;
    }

    if (this.enabledLanguages.length) {
      return this.enabledLanguages.indexOf(language) !== -1;
    }

    return true;
  }
  bestLanguage(facts:any){
    let lang:any = "*";
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
  updateTranslationServices(lang:string){
    let useRightToLeft = ["ar", "dv", "fa", "fa_AF", "he", "ps", "ug", "ur"].indexOf(lang) !== -1;
    document.getElementsByTagName("html")[0].setAttribute("dir", useRightToLeft ? "rtl" : "ltr");
    this.translateService.use(lang)
    this.translateService.setDefaultLang(lang)
  }
  determineLanguage(){
    this.language = this.state.language = this.bestLanguage(this.facts);
    if (this.state.language !== "*") {
      this.updateTranslationServices(this.state.language);
      window.document.getElementsByTagName("html")[0].setAttribute("lang", this.state.language);
    }
  }
  addNodeFacts(defaultLang:any, languages_enabled:any){
    this.facts.nodeDefault = defaultLang;

    this.enabledLanguages = languages_enabled;

    this.determineLanguage();
  }
  validLang(inp:string) {
    if (!inp) {
      return false;
    }

    if (this.enabledLanguages.length) {
      return this.enabledLanguages.indexOf(inp) > -1;
    }

    return true;
  }
  setLang(choice:any) {
    if (choice) {
      choice = this.state.language;
    }

    if (this.validLang(choice)) {
      this.facts.userChoice = choice;
      this.determineLanguage();
    }
  }
  onChange(){
    this.state.language = this.language
    this.setLang(this.language)
    this.utilsService.reloadCurrentRoute();
  }


  constructor(public translateService: TranslateService, private router: Router, public utilsService:UtilsService) {
  }
}
