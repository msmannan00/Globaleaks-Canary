import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {HttpService} from "@app/shared/services/http.service";
import { TranslateModule } from "@ngx-translate/core";
import { TranslatorPipe } from "@app/shared/pipes/translate";

@Component({
    selector: "src-activation",
    templateUrl: "./activation.component.html",
    standalone: true,
    imports: [TranslateModule, TranslatorPipe]
})
export class ActivationComponent implements OnInit {

  constructor(private route: ActivatedRoute, private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if ("token" in params) {
        const token = params["token"];
        this.httpService.requestSignupToken(token).subscribe();
      }
    });
  }
}
