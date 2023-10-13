import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {NgForm} from "@angular/forms";
import {NgbTooltipConfig} from "@ng-bootstrap/ng-bootstrap";
import {NodeResolver} from "app/src/shared/resolvers/node.resolver";
import {UtilsService} from "app/src/shared/services/utils.service";
import {AppConfigService} from "@app/services/app-config.service";
import {TranslationService} from "@app/services/translation.service";
import {AppDataService} from "@app/app-data.service";
import {NgSelectComponent} from "@ng-select/ng-select";

@Component({
  selector: "src-tab3",
  templateUrl: "./tab3.component.html"
})
export class Tab3Component implements OnInit {
  @Input() contentForm: NgForm;
  @ViewChild("langSelect") langSelect: NgSelectComponent;

  showLangSelect = false;
  selected = {value: null};
  languages_enabled: any = {};
  languages_enabled_selector: any[] = [];
  languages_supported: any = {};

  constructor(private appDataService: AppDataService, private translationService: TranslationService, private appConfigService: AppConfigService, private utilsService: UtilsService, public nodeResolver: NodeResolver, private config: NgbTooltipConfig) {
    config.placement = "top";
  }

  ngOnInit(): void {
    this.updateLanguages();
  }

  updateLanguages(): void {
    this.languages_supported = {};
    this.languages_enabled = {};
    this.languages_enabled_selector = [];

    this.nodeResolver.dataModel.languages_supported.forEach((lang: any) => {
      this.languages_supported[lang.code] = lang;

      if (this.nodeResolver.dataModel.languages_enabled.indexOf(lang.code) !== -1) {
        this.languages_enabled[lang.code] = lang;
        this.languages_enabled_selector.push(lang);
      }
    });
  }

  toggleLangSelect() {
    this.showLangSelect = !this.showLangSelect;
  }

  langNotEnabledFilter(language: any) {
    return this.nodeResolver.dataModel.languages_enabled.indexOf(language.code) === -1;
  }

  enableLanguage(language: any) {
    if (language && (this.nodeResolver.dataModel.languages_enabled.indexOf(language.code) === -1)) {
      this.nodeResolver.dataModel.languages_enabled.push(language.code);
    }
    this.langSelect.clearModel();
  }

  removeLang(index: number, lang_code: string) {
    if (lang_code === this.nodeResolver.dataModel.default_language) {
      return;
    }
    this.nodeResolver.dataModel.languages_enabled.splice(index, 1);
  }

  updateNode() {
    this.utilsService.update(this.nodeResolver.dataModel).subscribe(res => {
      this.appDataService.public.node.languages_enabled = res["languages_enabled"];
      this.translationService.onChange(res["default_language"]);
      localStorage.removeItem("default_language");
      console.log(this.appDataService.public.node.languages_enabled);
      this.appConfigService.reinit(false);
    });
  }
}