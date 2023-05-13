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
  }

  downloadWBFile(wbfile: any) {

      const param=JSON.stringify({});
      this.httpService.requestToken(param).subscribe
      (
          {
              next: async token => {
                  const ans = await this.cryptoService.proofOfWork(token.id);
                  window.open("api/wbtip/wbfile/" + wbfile.id + "?token=" + token.id + ":" + ans);
              },
              error: (error: any) => {
                  alert(JSON.stringify(error))
              }
          }
      );
  }

  ngOnInit(): void {
  }

}
