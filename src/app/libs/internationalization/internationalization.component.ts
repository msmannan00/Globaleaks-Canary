import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-libs',
  templateUrl: './internationalization.component.html',
  styleUrls: ['./internationalization.component.css']
})
export class InternationalizationComponent {
  translate: TranslateService
  constructor(translate: TranslateService) {
    this.translate = translate
  }

  onLanguageChange(lang: string){
    this.translate.use(lang);
  }

}
