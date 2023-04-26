import {Component, Input} from '@angular/core';
import {LoginDataRef} from "../../../pages/auth/login/model/login-model";

@Component({
  selector: 'src-password-meter',
  templateUrl: './password-meter.component.html',
  styleUrls: ['./password-meter.component.css']
})
export class PasswordMeterComponent {

  @Input() password: string = "";
  @Input() Strengthtext: string = "";
  @Input() Strengthtype: string = "";
  @Input() passwordStrengthScore = 0

}
