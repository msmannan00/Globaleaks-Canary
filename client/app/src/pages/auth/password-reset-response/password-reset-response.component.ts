import {Component, OnInit} from '@angular/core';
import {password_recovery_model} from "../../../models/authentication/password_recovery_model";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {HttpService} from "../../../shared/services/http.service";
import {UtilsService} from "../../../shared/services/utils.service";

@Component({
  selector: 'src-password-reset-response',
  templateUrl: './password-reset-response.component.html'
})
export class PasswordResetResponseComponent implements OnInit{
  state = "start";
  request = new password_recovery_model()

  constructor(private route: ActivatedRoute, private httpService: HttpService, private router:Router, public utilsService:UtilsService) {
  }

  submit() {
    let requestObservable:Observable<any>

    requestObservable = this.httpService.requestChangePassword(JSON.stringify({"reset_token":this.request.reset_token,"recovery_key":this.request.recovery_key,"auth_code":this.request.auth_code}))
    requestObservable.subscribe(
      {
        next: response => {

          if(response.status === "success") {
            this.router.navigate([("/login")], {queryParams:{token:response.token}});
          } else {
            if (response.status === "require_recovery_key") {
              this.request.recovery_key = "";
            }
            this.request.auth_code = "";
            this.state = response.status;
          }
        }
      }
    );

  };

  ngOnInit(): void {
    this.request.reset_token = this.route.snapshot.queryParams["token"] || ""
    this.request.recovery_key = this.route.snapshot.queryParams["recovery"] || ""

    if(this.state == "start"){
      this.submit()
    }
  }
}
