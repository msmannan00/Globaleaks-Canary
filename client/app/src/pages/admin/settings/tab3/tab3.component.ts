import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { NodeResolver } from 'app/src/shared/resolvers/node.resolver';
import { UtilsService } from 'app/src/shared/services/utils.service';
import {AppConfigService} from "../../../../services/app-config.service";
import {TranslationService} from "../../../../services/translation.service";
import {AppDataService} from "../../../../app-data.service";
import {NgSelectComponent} from "@ng-select/ng-select";

@Component({
  selector: 'src-tab3',
  templateUrl: './tab3.component.html',
  styleUrls: ['./tab3.component.css']
})
export class Tab3Component implements OnInit {
  @Input() contentForm: NgForm;
  @ViewChild('langSelect') langSelect: NgSelectComponent;
  constructor(private appDataService:AppDataService, private translationService:TranslationService, public appConfigService: AppConfigService, public utilsService: UtilsService, public node: NodeResolver, config: NgbTooltipConfig) {
    config.placement = 'top';
  }
  showLangSelect = false;
  selected = { value: null }; // You might need to adjust the structure

  languages_enabled: any = {};
  languages_enabled_selector: any[] = [];
  languages_supported: any = {};

  ngOnInit(): void {
    this.updateLanguages();
  }

  updateLanguages(): void {
    this.languages_supported = {};
    this.languages_enabled = {};
    this.languages_enabled_selector = [];

    this.node.dataModel.languages_supported.forEach((lang: any) => {
      this.languages_supported[lang.code] = lang;

      if (this.node.dataModel.languages_enabled.indexOf(lang.code) !== -1) {
        this.languages_enabled[lang.code] = lang;
        this.languages_enabled_selector.push(lang);
      }
    });
  }
  toggleLangSelect() {
    this.showLangSelect = !this.showLangSelect;
  }
  langNotEnabledFilter(language: any) {
    return this.node.dataModel.languages_enabled.indexOf(language.code) === -1;
  }
  // langNotEnabledFilter = (language: any) => {
  //   console.log(language, "language");
  //   return this.node.dataModel.languages_enabled.indexOf(language.code) === -1;
  // };
  enableLanguage(language: any) {
    if (language && (this.node.dataModel.languages_enabled.indexOf(language.code) === -1)) {
      this.node.dataModel.languages_enabled.push(language.code);
    }
    this.langSelect.clearModel()
  }
  removeLang(index: number, lang_code: string) {
    if (lang_code === this.node.dataModel.default_language) { return; }
    this.node.dataModel.languages_enabled.splice(index, 1);
  }

  updateNode() {
    this.utilsService.update(this.node.dataModel).subscribe(res => {
      this.appDataService.public.node.languages_enabled = res['languages_enabled']
      this.translationService.onChange(res['default_language'])
      localStorage.removeItem("default_language")
      console.log(this.appDataService.public.node.languages_enabled)
      this.appConfigService.reinit(false)
    })
  }
}
