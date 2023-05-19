import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup,FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/src/services/authentication.service';
import { Constants } from 'app/src/shared/constants/constants';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  step:number=1;
  private completed: boolean = false;
  validated2:boolean=false;
  validated3:boolean=false;
  validated4:boolean=false;
  validated5:boolean=false;
  validated6:boolean=false;
  admin_check_password:any;
  recipient_check_password:any;
  wizardFormStep1: FormGroup;
  wizardFormStep2: FormGroup;
  wizardFormStep4: FormGroup;
  wizardFormStep5: FormGroup;
  wizardFormStep6: FormGroup;
  licenseContent: string = `Content from license.txt`;

  emailRegexp=Constants.email_regexp;

  //Password Meter
  passwordStrengthScore: number=0;
  strengthText = ""
  strengthType = ""
  changePasswordArgs = {
    current: "",
    password: "",
    confirm: ""
};
passwordStrengthValidator(password:string){
    let types = [
        /[a-z]/.test(password),
        /[A-Z]/.test(password),
        /\W/.test(password),
        /\d/.test(password)
    ];

    let i,
        variation1 = 0,
        variation2 = 0,
        letters = new Map(),
        score = 0;

    if (password.length!=0) {
        /* Score symbols variation */

        for (i in types) {
            if(types[i]){
                variation1+=1
            }
        }

        /* Score unique symbols */
        for (i = 0; i < password.length; i++) {
            if (password.length>i && !letters.get(password.at(i))) {
                letters.set(password.at(i), 1);
                variation2 += 1;
            }
        }

        if (variation1 !== 4 || variation2 < 10 || password.length < 12) {
            score = 1;
        } else if (variation1 !== 4 || variation2 < 12 || password.length < 14) {
            score = 2;
        } else {
            score = 3;
        }
    }

    if(password.length == 0){
        this.strengthType = "";
        this.strengthText = "";
        this.passwordStrengthScore = 0
        return this.passwordStrengthScore
    }
    else if (score < 2) {
        this.strengthType = "bg-danger";
        this.strengthText = "Weak";
    } else if (score < 3) {
        this.strengthType = "bg-warning";
        this.strengthText = "Acceptable";
    } else {
        this.strengthType = "bg-primary";
        this.strengthText = "Strong";
    }

    this.passwordStrengthScore = score
    return score > 1;
}


  wizard = {
    node_name: '',
    admin_username: '',
    admin_name: '',
    admin_mail_address: '',
    admin_password: '',
    admin_escrow: true,
    receiver_username: '',
    receiver_name: '',
    receiver_mail_address: '',
    receiver_password: '',
    skip_admin_account_creation: false,
    skip_recipient_account_creation: false,
    profile: 'default',
    enable_developers_exception_notification: false
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private authenticationService: AuthenticationService  ) {}
  ngOnInit() {
    // if (this.public.node.wizard_done) {
    //   this.router.navigate(['/']);
    //   return;
    // }

    this.http.get('license.txt', { responseType: 'text' })
    .subscribe(data => {
      this.licenseContent = data;
    });


   


  }

 

  complete() {
    if (this.completed) {
      return;
    }
      this.step += 1;  //Temporaty

    this.completed = true;

    this.http.post("api/wizard", this.wizard).subscribe(() => {
      // this.step += 1;
    });
  }

  goToAdminInterface() {
    // this.authenticationService.login(0, this.wizard.admin_username, this.wizard.admin_password, "", "").subscribe(() => {
    //   this.router.navigate(['/admin/home']);
    // });
  }

  // selectProfile(name: string) {
  //   this.config_profiles.forEach(p => {
  //     p.active = p.name === name;
  //     if (p.active) {
  //       this.wizard.profile = p.name;
  //     }
  //   });
  // }
}