import { Injectable } from '@angular/core';
import {LoginDataRef} from "../auth/login/model/login-model";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  loginInProgress:Boolean = false;
  requireAuthCode:Boolean = false;
  loginData:LoginDataRef = new LoginDataRef();

  login(tid?:any, username?:any, password?:any, authcode?:any, authtoken?:any){

  }

  constructor() {
  }
}
