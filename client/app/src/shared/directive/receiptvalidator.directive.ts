import { Directive } from '@angular/core';
import {AbstractControl, Validator, NG_VALIDATORS, ValidationErrors} from '@angular/forms';

@Directive({
  selector: '[customReceiptValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ReceiptvalidatorDirective,
    multi: true
  }]
})
export class ReceiptvalidatorDirective implements Validator{

  constructor() {
  }

  validate(control: AbstractControl): ValidationErrors | null {

    if (control.value && control.value.length != 10) {
      let viewValue = control.value.replace(/\D/g, "");

      let result = "";
      while (viewValue.length) {
        result += viewValue.substring(0, 4);
        if(viewValue.length >= 4) {
          if (result.length < 19) {
            result += " ";
          }
          viewValue = viewValue.substring(4);
        } else {
          break;
        }
      }
      control.setValue(result)
      if (result.length === 19) {
        return { 'receiptvalidator': true };
      }

      return { 'receiptvalidator': false };
    }
    return null;
  }

}
