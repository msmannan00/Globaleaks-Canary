import {Pipe, PipeTransform} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

@Pipe({
  name: "translate",
  pure: false,
})
export class TranslatorPipe implements PipeTransform {
  constructor(private translate: TranslateService) {
  }

  transform(key: string): string {
    
    if (!key) {
      return key;
    }

    let translation = this.translate.instant(key);

    this.translate.onLangChange.subscribe(() => {
      translation = this.translate.instant(key);
    });

    return translation;
  }
}
