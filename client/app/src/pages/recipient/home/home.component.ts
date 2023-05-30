import { Component } from '@angular/core';
import {AppDataService} from "../../../app-data.service";
import { HttpService } from 'app/src/shared/services/http.service';


@Component({
  selector: 'src-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(public appDataService:AppDataService, ) {
  }

  ngOnInit(){
 
  }
}
