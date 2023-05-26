import { Component } from '@angular/core';
import { AuthenticationService } from 'app/src/services/authentication.service';

@Component({
  selector: 'src-user-warnings',
  templateUrl: './user-warnings.component.html',
  styleUrls: ['./user-warnings.component.css']
})
export class UserWarningsComponent  {

  constructor(public authentication: AuthenticationService) {
  }
}
