import {Component, Input, OnInit} from "@angular/core";
import {AuthenticationService} from "@app/services/helper/authentication.service";
import {LoginDataRef} from "@app/pages/auth/login/model/login-model";
import { NgForm, FormsModule } from "@angular/forms";
import {AppDataService} from "@app/app-data.service";
import { NgIf, NgFor } from "@angular/common";
import { NgSelectComponent, NgOptionComponent } from "@ng-select/ng-select";
import { TranslateModule } from "@ngx-translate/core";
import { TranslatorPipe } from "@app/shared/pipes/translate";

@Component({
    selector: "app-simple-login",
    templateUrl: "./simple-login.component.html",
    standalone: true,
    imports: [
        NgIf,
        FormsModule,
        NgSelectComponent,
        NgFor,
        NgOptionComponent,
        TranslateModule,
        TranslatorPipe,
    ],
})
export class SimpleLoginComponent implements OnInit {

  @Input() loginData: LoginDataRef;
  @Input() loginValidator: NgForm;

  constructor(protected authentication: AuthenticationService, protected appDataService: AppDataService) {
  }

  public ngOnInit(): void {

  }
}
