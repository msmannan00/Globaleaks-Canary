import { Component } from '@angular/core';
import {AppDataService} from "../../../app-data.service";

@Component({
  selector: 'src-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public appDataService:AppDataService) {
  }
}
