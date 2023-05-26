import { Component } from '@angular/core';
import {AppDataService} from "../../../app-data.service";
import { HttpService } from 'app/src/shared/services/http.service';


@Component({
  selector: 'src-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  sidebar:boolean = true;
  constructor(public appDataService:AppDataService, private http:HttpService) {
  }

  ngOnInit(){
    this.http.requestNodeResource({ "update": { method: "PUT" } })
      .subscribe({
        next: (response) => console.log(response),
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
    }
      );
  }
}
