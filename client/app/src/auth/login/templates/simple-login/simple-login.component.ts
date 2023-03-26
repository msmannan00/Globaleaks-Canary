import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AppConfigService } from '../../../../app-config.service';
import { AuthenticationService } from '../../../../services/authentication.service';
import { LoginDataRef } from '../../model/login-model';

@Component({
  selector: 'app-simple-login',
  templateUrl: './simple-login.component.html',
  styleUrls: ['./simple-login.component.css'],
})
export class SimpleLoginComponent {
  // cities = [
  //   { id: 1, name: 'Vilnius' },
  //   { id: 2, name: 'Kaunas' },
  //   { id: 3, name: 'Pavilnys', disabled: true },
  //   { id: 4, name: 'Pabradė' },
  //   { id: 5, name: 'Klaipėda' },
  // ];
  // selectedCity = null;
  @Input() loginData: LoginDataRef;
  @Input() loginFormValid: boolean;
  constructor(
    public appConfig: AppConfigService,
    public authentication: AuthenticationService
  ) {
    console.log('appConfig =>', appConfig);
  }
}
