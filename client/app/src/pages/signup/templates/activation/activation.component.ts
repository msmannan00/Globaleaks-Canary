import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpService} from "../../../../shared/services/http.service";

@Component({
  selector: 'src-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent implements OnInit{

  constructor(private route: ActivatedRoute, public httpService: HttpService) {
  }

  ngOnInit(): void {this.route.queryParams.subscribe(params => {
          if("token" in params){
              let token = params['token'];
              this.httpService.requestSignupToken(token).subscribe
              (
                  {
                      next: response => {
                          alert(JSON.stringify(response))
                      },
                      error: (error: any) => {
                          alert(JSON.stringify(error))
                      }
                  }
              );
          }
      });
  }

}
