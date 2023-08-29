import {Component, OnInit} from '@angular/core';
import {AppDataService} from "../../../app-data.service";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {Router} from "@angular/router";

@Component({
  selector: 'src-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class
HomeComponent implements OnInit{
  constructor(public router:Router, public appDataService:AppDataService) {
  }

  ngOnInit(): void {
  }
}
