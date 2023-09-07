import { Component, OnInit } from '@angular/core';
import { RedirectsResolver } from 'app/src/shared/resolvers/redirects.resolver';
import { HttpService } from 'app/src/shared/services/http.service';
import { UtilsService } from 'app/src/shared/services/utils.service';

@Component({
  selector: 'src-url-redirects',
  templateUrl: './url-redirects.component.html',
  styleUrls: ['./url-redirects.component.css']
})
export class UrlRedirectsComponent implements OnInit {
  new_redirect: any = {
    path1: '',
    path2: ''
  };
  redirectData: any=[]
  constructor(public redirects: RedirectsResolver, public httpService: HttpService, public utilsService: UtilsService) { }
  ngOnInit(): void {
    this.redirectData = this.redirects.dataModel
  }
  addRedirect() {
    const arg = {
      path1: this.new_redirect.path1,
      path2: this.new_redirect.path2
    }
    this.httpService.requestPostRedirectsResource(arg).subscribe((res) => {
      this.redirectData.push(res);
      this.new_redirect.path1 = '';
      this.new_redirect.path2 = '';
      // this.utilsService.reloadCurrentRoute()
    })
  }
  deleteRedirect(redirect: any) {
    this.httpService.requestDeleteRedirectsResource(redirect.id).subscribe(() => {
      // this.utilsService.reloadCurrentRoute()
    })
  }
}
