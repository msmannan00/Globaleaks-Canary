import {Component, OnInit} from "@angular/core";
import {AuthenticationService} from "@app/services/authentication.service";
import {LoginDataRef} from "@app/pages/auth/login/model/login-model";
import {ActivatedRoute, Router} from "@angular/router";
import {AppDataService} from "@app/app-data.service";


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {

  loginData = new LoginDataRef();

  constructor(private authentication: AuthenticationService, private router: Router, private route: ActivatedRoute, protected appDataService: AppDataService) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if ("token" in params) {
        let token = params["token"];
        this.authentication.login(0, "", "", "", token);
      } else {
        if (this.authentication.session && this.authentication.session.homepage) {
          this.router.navigateByUrl(this.authentication.session.homepage);
        }
      }
    });
  };
}
