import {HostListener, NgModule, CUSTOM_ELEMENTS_SCHEMA, OnDestroy} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppRoutingModule} from "@app/app-routing.module";
import {AppComponent} from "@app/pages/app/app.component";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";

import {APP_BASE_HREF, HashLocationStrategy, LocationStrategy, NgOptimizedImage,} from "@angular/common";

import {HeaderComponent} from "@app/shared/partials/header/header.component";
import {UserComponent} from "@app/shared/partials/header/template/user/user.component";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {
  CompletedInterceptor,
  ErrorCatchingInterceptor,
  appInterceptor
} from "@app/services/root/app-interceptor.service";
import {Keepalive, NgIdleKeepaliveModule} from "@ng-idle/keepalive";
import {DEFAULT_INTERRUPTSOURCES, Idle} from "@ng-idle/core";
import {AuthenticationService} from "@app/services/helper/authentication.service";
import {HomeComponent} from "@app/pages/dashboard/home/home.component";
import {TranslatorPipe} from "@app/shared/pipes/translate";
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule} from "@angular/forms";


import {MarkdownModule, MarkedOptions, MARKED_OPTIONS} from "ngx-markdown";
import {ReceiptValidatorDirective} from "@app/shared/directive/receipt-validator.directive";
import {NgxFlowModule, FlowInjectionToken} from "@flowjs/ngx-flow";
import * as Flow from "@flowjs/flow.js";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";


import {RecipientModule} from "@app/pages/recipient/recipient.module";

import {CustodianModule} from "@app/pages/custodian/custodian.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AnalystModule} from "@app/pages/analyst/analyst.module";
import {mockEngine} from './services/helper/mocks';
import {HttpService} from "./shared/services/http.service";
import {CryptoService} from "@app/shared/services/crypto.service";
import {TranslationService} from "@app/services/helper/translation.service";
import {NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';
import {CustomDatepickerI18n} from '@app/shared/services/custom-datepicker-i18n';
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

const translationModule = TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: createTranslateLoader,
      deps: [HttpClient],
    },
  })
;

@NgModule(/* TODO(standalone-migration): clean up removed NgModule class manually. 
{
    declarations: [AppComponent],
    imports: [
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    RecipientModule,
    translationModule,
    NgSelectModule,
    FormsModule,
    CustodianModule,
    AnalystModule,
    NgIdleKeepaliveModule.forRoot(),
    MarkdownModule.forRoot({
        markedOptions: {
            provide: MARKED_OPTIONS,
            useValue: {
                breaks: true
            }
        }
    }),
    NgxFlowModule,
    NgOptimizedImage,
    HomeComponent, HeaderComponent, UserComponent
],
    providers: [
        ReceiptValidatorDirective,
        { provide: 'MockEngine', useValue: mockEngine },
        TranslatorPipe, TranslateService,
        { provide: HTTP_INTERCEPTORS, useClass: appInterceptor, multi: true },
        { provide: APP_BASE_HREF, useValue: "/" },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorCatchingInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: CompletedInterceptor, multi: true },
        { provide: FlowInjectionToken, useValue: Flow },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
} */)
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

