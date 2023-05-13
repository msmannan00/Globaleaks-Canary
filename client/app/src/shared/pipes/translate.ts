
import {Pipe} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

@Pipe({name:'translate'})
export class TranslatorPipe {

  constructor(private translateService:TranslateService) {
  }

  transform(value: string) {
    return this.translateService.instant(value);
  }
}