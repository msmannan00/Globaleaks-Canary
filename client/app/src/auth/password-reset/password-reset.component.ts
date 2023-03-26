import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'src-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent {
  username:any = undefined

  submitRequest(){
    if(this.username !== undefined){
      this.authenticationService.resetPassword(this.username)
    }
  }

  constructor(private authenticationService:AuthenticationService,private router: Router) {
  }
}
