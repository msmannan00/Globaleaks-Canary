import { Component } from '@angular/core';
import { AuthenticationService } from 'app/src/services/authentication.service';
import { PreferenceResolver } from '../../resolvers/preference.resolver';
import { NodeResolver } from '../../resolvers/node.resolver';

@Component({
  selector: 'src-user-warnings',
  templateUrl: './user-warnings.component.html',
  styleUrls: ['./user-warnings.component.css'],
})
export class UserWarningsComponent  {

  constructor(public authentication: AuthenticationService, public preferece:PreferenceResolver, public node:NodeResolver) {
  }
}
