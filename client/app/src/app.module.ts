import {HostListener, NgModule, OnDestroy} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {Keepalive} from "@ng-idle/keepalive";
import {DEFAULT_INTERRUPTSOURCES, Idle} from "@ng-idle/core";
import {AuthenticationService} from "@app/services/helper/authentication.service";
import {mockEngine} from './services/helper/mocks';
import {HttpService} from "./shared/services/http.service";
import {CryptoService} from "@app/shared/services/crypto.service";
import {registerLocales} from '@app/services/helper/locale-provider';

// Register all the locales
registerLocales();

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "l10n/", "");
}

(window as any).mockEngine = mockEngine;
declare global {
  interface Window {
    GL: {
      language: string;
      mockEngine: any;
    };
  }
}
window.GL = {
  language: 'en', // Assuming a default language
  mockEngine: mockEngine
};

@NgModule()
export class AppModule implements OnDestroy {

  constructor(private cryptoService:CryptoService, private authenticationService: AuthenticationService, private idle: Idle, private keepalive: Keepalive, private httpService: HttpService) {
    this.initIdleState();
  }

  @HostListener("window:beforeunload")
  async ngOnDestroy() {
    this.reset();
  }

  initIdleState() {
    this.idle.setIdle(1500);
    this.idle.setTimeout(300);
    this.keepalive.interval(30);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.keepalive.onPing.subscribe(() => {
      if (this.authenticationService && this.authenticationService.session) {
        const token = this.authenticationService.session.token;
        this.cryptoService.proofOfWork(token.id).subscribe((result:any) => {
	  const param = {'token': token.id + ":" + result};
          this.httpService.requestRefreshUserSession(param).subscribe(((result:any) => {
            this.authenticationService.session.token = result.token;
	  }));
	});
      }
    });

    this.idle.onTimeout.subscribe(() => {
      if (this.authenticationService && this.authenticationService.session) {
        if (this.authenticationService.session.role === "whistleblower") {
          window.location.replace("about:blank");
        } else {
          this.authenticationService.deleteSession();
          this.authenticationService.loginRedirect();
        }
      }
    });

    this.reset();
  }

  reset() {
    this.idle.watch();
    this.authenticationService.reset();
  }
}

