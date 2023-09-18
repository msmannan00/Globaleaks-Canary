import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";
import {UtilsService} from "../../services/utils.service";
import {HttpService} from "../../services/http.service";
import {CryptoService} from "../../../crypto.service";

@Component({
  selector: 'src-wbfiles',
  templateUrl: './wbfiles.component.html',
  styleUrls: ['./wbfiles.component.css']
})
export class WbfilesComponent implements OnInit{
  @Input() wbfile:any
  @Input() ctx:any
  @Input() receivers_by_id:any

  constructor(private cryptoService: CryptoService, public httpService: HttpService, public utilsService:UtilsService, public authenticationService:AuthenticationService) {
  }

  deleteWBFile(wbfile: any) {
      if(this.authenticationService.session.role == "receiver"){
          const param=JSON.stringify({});
          this.httpService.deleteDBFile(wbfile.id).subscribe
          (
              {
                  next: async token => {
                      this.utilsService.reloadCurrentRoute();
                  },
                  error: (error: any) => {
                  }
              }
          );
      }
  }

  downloadWBFile(wbfile: any) {

      const param=JSON.stringify({});
      this.httpService.requestToken(param).subscribe
      (
          {
              next: async token => {
                  const ans = await this.cryptoService.proofOfWork(token.id);
                  if(this.authenticationService.session.role == "receiver"){
                      window.open("api/whistleblower/wbfile/" + wbfile.id + "?token=" + token.id + ":" + ans);
                  }else {
                      window.open("api/whistleblower/wbtip/wbfile/" + wbfile.id + "?token=" + token.id + ":" + ans);
                  }
              },
              error: (error: any) => {
              }
          }
      );
  }

  ngOnInit(): void {
  }

}
