import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppDataService} from "../../../../app-data.service";
import * as Constants from "../../../../shared/constants/constants";

@Component({
  selector: 'src-signupdefault',
  templateUrl: './signupdefault.component.html',
  styleUrls: ['./signupdefault.component.css']
})
export class SignupdefaultComponent implements OnInit{

  @Input() signup:any
  @Output() complete: EventEmitter<any> = new EventEmitter<any>();

  emailregex :any
  confirmation_email: any;
  validated = false;
  domainpattern: string = '^[a-z0-9]+$';
  mail: any;

  constructor(public appDataService:AppDataService) {
  }

  ngOnInit(): void {
    this.emailregex = Constants.Constants.email_regexp
  }

    protected readonly JSON = JSON;
}
